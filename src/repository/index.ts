import type { IPagination, IResponse, IResponseList } from '@/api';

const PER = 10;

export const filter = <T = unknown>(data: T[], cb: (item: T) => boolean) => {
  return data.map(cb);
};

export const paginate = <T = unknown>(data: T[], page: number, per = PER): [T[], IPagination] => {
  const sliceStart = (page - 1) * per;
  const slicedData = data.slice(sliceStart, sliceStart + per);

  return [
    slicedData,
    {
      page,
      total: data.length,
      totalPages: Math.ceil(data.length / per),
      count: slicedData.length,
    },
  ];
};

export const wrapToPromise = <T = unknown>(data: T) => {
  return new Promise<IResponse<T>>(res => {
    setTimeout(() => {
      res({ data });
    }, 150);
  });
};

export const wrapToListPromise = <T = unknown>(data: T[], pagination: IPagination) => {
  return new Promise<IResponseList<T>>(res => {
    setTimeout(() => {
      res({ data, pagination });
    }, 150);
  });
};
