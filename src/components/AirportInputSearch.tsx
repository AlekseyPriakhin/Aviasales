import React, { useRef, useState } from 'react';
import styles from './AirportInputSearch.module.scss';

import type { INodeProps } from '@/types';
import { Collapse, TextField } from '@mui/material';

const dictionary = [
  {
    name: 'Москва',
    tag: 'MOW',
  },
  {
    name: 'Санкт-Петербург',
    tag: 'LED',
  },
  {
    name: 'Казань',
    tag: 'KZN',
  },
  {
    name: 'Екатеринбург',
    tag: 'EKB',
  },
  {
    name: 'Новосибирск',
    tag: 'NOV',
  },
];

interface IParams extends INodeProps {
  label: string;
  value: string;
  setValue: (v: string) => void;
}
const AirportInput = ({ className, label, value, setValue }: IParams) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const filteredItems = dictionary.filter(item => item.name.includes(value) || item.tag.includes(value));
  const isDropdownShown = isInputFocused && Boolean(filteredItems.length) && value.length > 2;

  const input = useRef<HTMLInputElement>(null);

  const handleSelectDropdownItem = (v: string) => {
    setValue(v);
    if (input.current) {
      input.current.blur();
    }
  };

  return (
    <div className={[className].join(' ')}>
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
          {dictionary
            .filter(item => item.name.includes(value) || item.tag.includes(value))
            .map(item => (
              <div
                className={styles['dropdown-item']}
                tabIndex={1}
                key={item.tag}
                onClick={() => handleSelectDropdownItem(item.name)}>
                {item.name} {item.tag}
              </div>
            ))}
        </div>
      </Collapse>
    </div>
  );
};

export default AirportInput;
