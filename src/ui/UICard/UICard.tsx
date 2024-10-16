import styles from './UICard.module.scss';
import type { INodeProps } from '@/types';

interface IProps extends INodeProps {
  background?: 'accent' | 'primary' | 'secondary';
}

const UICard = ({ background = 'primary', children, styleClass }: IProps) => {
  const classes = [styleClass, styles['card'], styles[background]].join(' ');

  return <div className={classes}> {children}</div>;
};

export default UICard;
