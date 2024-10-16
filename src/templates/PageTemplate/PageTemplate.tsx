import styles from './PageTemplate.module.scss';
import type { INodeProps } from '@/types';

const PageTemplate = ({ children, styleClass }: INodeProps) => {
  return <div className={[styles['container'], styleClass].join(' ')}>{children}</div>;
};

export default PageTemplate;
