import { IFlight } from '@/types/flight';
import { InputLabel, MenuItem, Select, TextField } from '@mui/material';

import type { ITicketClassFormData } from '@/components/Forms/FlightForm';
import type { Currency, TicketClassName } from '@/types/ticketClass';

import styles from './TicketClassForm.module.scss';
import { useI18n } from '@/hooks/useI18n';

interface IProps {
  flight?: IFlight;
  value: Record<TicketClassName, ITicketClassFormData>;
  onChange: (classes: Record<TicketClassName, ITicketClassFormData>) => void;
}

const TicketClassForm = ({ value, onChange }: IProps) => {
  const { t } = useI18n();

  const currencys: Currency[] = ['RUB', 'USD', 'EUR'];

  return (
    <div className={styles['form']}>
      Классы билетов
      <InputLabel id="currency-select-label">Валюта</InputLabel>
      <Select labelId="currency-select-label">
        {currencys.map(c => (
          <MenuItem
            key={c}
            value={c}>
            {c}
          </MenuItem>
        ))}
      </Select>
      {[value.First, value.Business, value.Economy].map(c => (
        <div
          key={c.name}
          className={styles['field']}>
          {t('tickets', c.name)} -
          <TextField
            value={c.total}
            onChange={e => onChange({ ...value, [c.name]: { ...c, total: Number(e.target.value) } })}
            label="Кол-во мест"
          />
          <TextField
            value={c.cost}
            onChange={e => onChange({ ...value, [c.name]: { ...c, cost: Number(e.target.value) } })}
            label="Стоимость"
          />
        </div>
      ))}
    </div>
  );
};

export default TicketClassForm;
