'use client';
import { LocalizationProvider as L } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {name} from 'dayjs/locale/ru';
import type { INodeProps } from '@/types';

const LocalizationProvider = ({ children }: INodeProps) => (
  <L
    dateAdapter={AdapterDayjs}
    adapterLocale={name}>
    {' '}
    {children}{' '}
  </L>
);

export default LocalizationProvider;
