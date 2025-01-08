import { INodeProps } from '@/types';
import styles from './UITitle.module.scss';

interface IProps extends INodeProps {
  title?: string;
}

const UITitle = ({ title, children, className }: IProps) => {
  return <h1 className={[styles['title'], className].join(' ')}>{children ? children : title}</h1>;
};

export default UITitle;
