import UIContainer from '@/ui/UIContainer';

import styles from './UIPageHeader.module.scss';

import type { INodeProps } from '@/types';

const UIPageHeader = ({ children, className }: INodeProps) => {
  return (
    <UIContainer className={[styles['page-header'], className].join(' ')}>
      <div className={styles['content']}>{children}</div>
    </UIContainer>
  );
};

export default UIPageHeader;
