import styles from './UIICon.module.scss';

import rub from '@/images/icons/rub.svg';
import usd from '@/images/icons/usd.svg';
import eur from '@/images/icons/eur.svg';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ChairAltRoundedIcon from '@mui/icons-material/ChairAltRounded';

import type { INodeProps } from '@/types';
import { Currency } from '@/types/ticketClass';

type IconName = Currency | 'calendar' | 'arrow-right' | 'time' | 'add' | 'seat';

interface IProps extends INodeProps {
  size?: string;
  name: IconName;
  color?: string;
  contentPosition?: 'before' | 'after';
}

const nameComponentMap = {
  calendar: CalendarMonthOutlinedIcon,
  'arrow-right': ArrowRightAltOutlinedIcon,
  time: AccessTimeOutlinedIcon,
  add: AddRoundedIcon,
  EUR: eur,
  RUB: rub,
  USD: usd,
  seat: ChairAltRoundedIcon,
} as const satisfies Record<IconName, any>;

// const localFileIcons: IconName[] = ['rub', 'euro', 'usd'];

const UIIcon = ({ size = '24px', name, color = '#010', children, className, contentPosition = undefined }: IProps) => {
  const AppIcon = nameComponentMap[name];

  return (
    <div className={[styles['container'], className].join(' ')}>
      {children && contentPosition === 'before' && children}
      <AppIcon
        style={{ height: size, width: size, color }}
        className={styles['icon']}></AppIcon>

      {children && contentPosition === 'after' && children}
    </div>
  );
};

export default UIIcon;
