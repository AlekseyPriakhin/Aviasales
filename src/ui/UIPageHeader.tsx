import UIContainer from '@/ui/UIContainer';
import { Divider } from '@mui/material';

import styles from './UIPageHeader.module.scss';

import type { INodeProps } from '@/types';

interface IProps extends INodeProps {
  contentClass?: string;
}

const UIPageHeader = ({ children, className, contentClass }: IProps) => {
  return (
    <UIContainer className={[styles['page-header'], className].join(' ')}>
      <div className={[styles['content'], contentClass].join(' ')}>{children}</div>
      <Divider />
    </UIContainer>
  );
};

export default UIPageHeader;
