import { withDbClient } from '@/server/repository';

interface ISearchResult {
  result: string[];
  createdAt: Date;
}

const cache = new Map<string, ISearchResult>();

const TTL = 1 * 60 * 1000; // 10 min

const clearElapsed = () => {
  const currentDate = new Date();

  cache.forEach(({ createdAt }, key) => {
    if (currentDate.getTime() - createdAt.getTime() > TTL) cache.delete(key);
  });
};

setInterval(clearElapsed, TTL);

const getAndUpdateTime = (query: string): string[] => {
  const prev = cache.get(query);
  if (prev) cache.set(query, { ...prev, createdAt: new Date() });

  return cache.get(query)?.result || [];
};

export const getSearchResults = async (query: string) => {
  if (!cache.has(query)) {
    const result = await withDbClient(async client => {
      const data = await client.route.findMany({
        where: { OR: [{ from: { contains: query } }] },
        select: { from: true },
        distinct: ['from'],
      });

      return data.map(e => e.from);
    });

    cache.set(query, { result, createdAt: new Date() });
  }

  return getAndUpdateTime(query);
};
