import styles from './UIICon.module.scss';

import rub from '@/images/icons/rub.svg';
import usd from '@/images/icons/usd.svg';
import eur from '@/images/icons/eur.svg';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

import type { INodeProps } from '@/types';
import { Currency } from '@/types/ticketClass';

type IconName = Currency | 'calendar' | 'arrow-right' | 'time';

interface IProps extends INodeProps {
  size?: string;
  name: IconName;
  color?: string;
}

const nameComponentMap = {
  calendar: CalendarMonthOutlinedIcon,
  'arrow-right': ArrowRightAltOutlinedIcon,
  time: AccessTimeOutlinedIcon,
  EUR: eur,
  RUB: rub,
  USD: usd,
} as const satisfies Record<IconName, any>;

// const localFileIcons: IconName[] = ['rub', 'euro', 'usd'];

const UIIcon = ({ size = '24px', name, color = '#010' }: IProps) => {
  const AppIcon = nameComponentMap[name];

  return (
    <AppIcon
      style={{ height: size, width: size, color }}
      className={styles['icon']}></AppIcon>
  );
};

export default UIIcon;
