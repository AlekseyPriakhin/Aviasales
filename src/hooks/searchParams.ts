import { useSearchParams as useParams } from 'next/navigation';

export interface IAppSearchParams {
  flightId?: string;
}

export const useSearchParams = <T extends IAppSearchParams = IAppSearchParams>() => {
  const getSearchParams = <U extends T>(init = {} as U): U & T => {
    const params = init;

    const searchParams = useParams();

    Object.keys(searchParams).forEach(key => {
      const value = searchParams.get(key);
      if (value) params[key as keyof IAppSearchParams] = String(value);
    });

    return params;
  };

  const getSearchParam = (key: keyof T, init?: string) => {
    const value = useParams().get(String(key));
    if (value) return String(value);

    return init || undefined;
  };

  return { getSearchParams, getSearchParam };
};
