import { useI18n } from '@/hooks/useI18n';
import { Button } from '@gravity-ui/uikit';

import styles from './ListTemplate.module.scss';

import type { INodeProps } from '@/types';

interface IProps extends INodeProps {
  listClass?: string;
  isLoading: boolean;
  isLoadMoreAvailable: boolean;
  onLoadMore: () => void;
}

const ListTemplate = ({ children, listClass, isLoadMoreAvailable, isLoading, onLoadMore }: IProps) => {
  const { t } = useI18n();

  return (
    <div className={styles['container']}>
      <div className={listClass}>{children}</div>
      {isLoadMoreAvailable && (
        <Button
          disabled={isLoading}
          onClick={onLoadMore}>
          {' '}
          {t('common', 'loadMore')}{' '}
        </Button>
      )}
    </div>
  );
};

export default ListTemplate;
