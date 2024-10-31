import type { INodeProps } from '@/types';

interface IProps<T> extends INodeProps {
  isLoading: boolean;
  loadingLayout?: React.ReactNode;
  isNothingFound: boolean;
  nothingFoundLayout?: React.ReactNode;
  items: T[] | undefined;
  itemsLayout: (items: T[]) => React.ReactNode;
}

const defaultLoadingLayout = <p>Загрузка</p>;
const defaultNothingFoundLayout = <p>Ничего не найдено</p>;

const LoadableListTemplate = <T,>({
  isLoading,
  loadingLayout = defaultLoadingLayout,
  isNothingFound,
  nothingFoundLayout = defaultNothingFoundLayout,
  items,
  itemsLayout,
}: IProps<T>) => {
  if (isLoading) return loadingLayout;

  if (isNothingFound || !items) return nothingFoundLayout;

  return itemsLayout(items);
};

export default LoadableListTemplate;
