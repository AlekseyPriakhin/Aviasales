import UIContainer from '@/ui/UIContainer';

import styles from './UIPageContent.module.scss';

import type { INodeProps } from '@/types';

const UIPageContent = ({ children, className }: INodeProps) => {
  return <UIContainer className={[styles['page-content'], className].join(' ')}>{children}</UIContainer>;
};

export default UIPageContent;
