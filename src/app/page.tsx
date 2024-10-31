'use client';
import { useState } from 'react';
import styles from './page.module.scss';
import AirportInputSearch from '@/components/AirportInputSearch';
import UIContainer from '@/ui/UIContainer';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LocalizationProvider from '@/providers/LocalizationProvider';

const Page = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  return (
    <UIContainer>
      <div className={styles['inputs']}>
        <AirportInputSearch
          label="Откуда:"
          value={from}
          setValue={setFrom}
        />

        <AirportInputSearch
          label="Куда:"
          value={to}
          setValue={setTo}
        />

        <LocalizationProvider>
          <DatePicker />
        </LocalizationProvider>
      </div>
    </UIContainer>
  );
};

export default Page;
