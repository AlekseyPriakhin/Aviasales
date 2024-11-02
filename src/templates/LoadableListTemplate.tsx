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
  className,
}: IProps<T>) => {
  return (
    <div className={className}>
      {isLoading ? loadingLayout : isNothingFound || !items ? nothingFoundLayout : itemsLayout(items)}
    </div>
  );
};

export default LoadableListTemplate;
