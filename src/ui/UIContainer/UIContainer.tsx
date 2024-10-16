import type { INodeProps } from '@/types';
import styles from './UIContainer.module.scss';

export default function UIContainer({ children, styleClass = '' }: INodeProps) {
  return <div className={`${styles['container']} ${styleClass}`}>{children}</div>;
}
