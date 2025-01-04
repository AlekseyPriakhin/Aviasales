import React, { useRef, useState } from 'react';
import styles from './InputWithHints.module.scss';

import { Grow, TextField } from '@mui/material';
import { MIN_SEARCH_LENGTH } from '@/queries/routes';

import type { INodeProps } from '@/types';
import { useI18n } from '@/hooks/useI18n';

interface IParams extends INodeProps {
  label: string;
  value: string;
  setValue: (v: string) => void;
  selectValue: (v: string) => void;
  items: string[];
  isLoading?: boolean;
}
const InputWithHints = ({ className, label, value, items, isLoading = false, setValue, selectValue }: IParams) => {
  const { t } = useI18n();

  const [isInputFocused, setIsInputFocused] = useState(false);

  const filteredItems = items.filter(item => item.toLowerCase() !== value.toLowerCase());

  const isDropdownShown = isInputFocused && (value.length >= MIN_SEARCH_LENGTH || items.length > 0 || isLoading);
  const isNothingFound = filteredItems.length === 0;

  const input = useRef<HTMLInputElement>(null);

  const handleSelectDropdownItem = (v: string) => {
    selectValue(v);
    if (input.current) {
      //input.current.blur();
    }
  };

  return (
    <div className={[styles['search'], className].join(' ')}>
      <TextField
        ref={input}
        label={label}
        variant="outlined"
        value={value}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        onChange={e => setValue(e.target.value)}
      />

      <Grow in={isDropdownShown}>
        <div className={styles['dropdown']}>
          {isLoading ? (
            <div className={styles['dropdown-item']}>{t('inputWithHints', 'loading')}</div>
          ) : isNothingFound ? (
            <div className={styles['dropdown-item']}>{t('inputWithHints', 'notFound')}</div>
          ) : (
            filteredItems.map(item => (
              <div
                className={[styles['dropdown-item'], styles['clickable']].join(' ')}
                tabIndex={1}
                key={item}
                onClick={() => handleSelectDropdownItem(item)}>
                {item}
              </div>
            ))
          )}
        </div>
      </Grow>
    </div>
  );
};

export default InputWithHints;
