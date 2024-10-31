import type { INodeProps } from '@/types';
import styles from './UIICon.module.scss';
import rub from '@/images/icons/rub.svg';
import usd from '@/images/icons/usd.svg';
import eur from '@/images/icons/eur.svg';

type IconName = 'rub' | 'usd' | 'euro';

interface IProps extends INodeProps {
  size?: string;
  name: IconName;
  color?: string;
}

const nameIcon = {
  euro: eur,
  rub,
  usd,
} as const satisfies Record<IconName, any>;

const UIIcon = ({ size = '24px', name }: IProps) => {
  const Icon = nameIcon[name];

  return (
    <Icon
      style={{ height: size, width: size, fill: '#fff' }}
      className={styles['icon']}></Icon>
  );
};

export default UIIcon;
