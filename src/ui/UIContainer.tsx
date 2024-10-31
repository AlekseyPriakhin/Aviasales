import type { INodeProps } from '@/types';
import styles from './UIContainer.module.scss';

export default function UIContainer({ children, className = '' }: INodeProps) {
  return <div className={`${styles['container']} ${className}`}>{children}</div>;
}
