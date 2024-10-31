import styles from './UICard.module.scss';
import type { INodeProps } from '@/types';

interface IProps extends INodeProps {
  background?: 'accent' | 'primary' | 'secondary' | 'transparent';
}

const UICard = ({ background = 'transparent', children, className }: IProps) => {
  const classes = [className, styles['card'], styles[background]].join(' ');

  return <div className={classes}> {children}</div>;
};

export default UICard;
