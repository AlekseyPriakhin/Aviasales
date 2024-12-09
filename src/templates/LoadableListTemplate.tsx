import { LoadingButton } from '@mui/lab';

import styles from './LoadableListTemplate.module.scss';

import type { INodeProps } from '@/types';

interface IProps<T> extends INodeProps {
  isLoading: boolean;
  loadingLayout?: React.ReactNode;
  isNothingFound: boolean;
  nothingFoundLayout?: React.ReactNode;
  items: T[] | undefined;
  hasNextPage?: boolean;
  isFetching?: boolean;
  loadMoreLayout?: React.ReactDOM;
  itemsLayout: (items: T[]) => React.ReactNode;
  onLoadMore?: () => void;
}

const defaultLoadingLayout = <p>Загрузка</p>;
const defaultNothingFoundLayout = <p>Ничего не найдено</p>;

const LoadableListTemplate = <T,>({
  isLoading,
  loadingLayout = defaultLoadingLayout,
  isNothingFound,
  nothingFoundLayout = defaultNothingFoundLayout,
  items,
  hasNextPage = false,
  isFetching = false,
  itemsLayout,
  onLoadMore = () => {},
  className,
}: IProps<T>) => {
  return (
    <div>
      {isLoading || isFetching ? (
        loadingLayout
      ) : isNothingFound || !items ? (
        nothingFoundLayout
      ) : (
        <div className={styles['container']}>
          <div className={className}> {itemsLayout(items)} </div>
          {hasNextPage && (
            <LoadingButton
              className={styles['load-more']}
              variant="contained"
              color="info"
              loading={isFetching}
              onClick={onLoadMore}>
              Показать еще
            </LoadingButton>
          )}
        </div>
      )}
    </div>
  );
};

export default LoadableListTemplate;
