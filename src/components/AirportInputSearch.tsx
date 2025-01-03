import React, { useRef, useState } from 'react';
import styles from './AirportInputSearch.module.scss';

import type { INodeProps } from '@/types';
import { Collapse, TextField } from '@mui/material';

interface IParams extends INodeProps {
  label: string;
  value: string;
  setValue: (v: string) => void;
  selectValue: (v: string) => void;
  items: string[];
  isLoading?: boolean;
}
const AirportInput = ({ className, label, value, items, isLoading = false, setValue, selectValue }: IParams) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const isDropdownShown = isInputFocused;
  const isNothingFound = items.length === 0;

  const input = useRef<HTMLInputElement>(null);

  const handleSelectDropdownItem = (v: string) => {
    console.log('change');

    selectValue(v);
    setValue(v);
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
      <Collapse in={isDropdownShown}>
        <div className={styles['dropdown']}>
          {isNothingFound && !isLoading && value.length > 0 && (
            <div className={styles['dropdown-item']}>Ничего не нашлось</div>
          )}
          {items.length > 0 &&
            !isNothingFound &&
            items.map(item => (
              <div
                className={[styles['dropdown-item'], styles['clickable']].join(' ')}
                tabIndex={1}
                key={item}
                onClick={() => handleSelectDropdownItem(item)}>
                {item}
              </div>
            ))}
        </div>
      </Collapse>
    </div>
  );
};

export default AirportInput;
