import LocalizationProvider from '@/providers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

interface IProps {
  label: string;
  value: string;
  onChange: (date: string | null) => void;
  onBlur?: () => void;
}

const UIDatePicker = ({ label, value, onChange, onBlur }: IProps) => {
  return (
    <LocalizationProvider>
      <DatePicker
        label={label}
        views={['year', 'month', 'day']}
        format="DD.MM.YYYY"
        value={dayjs(value)}
        onChange={d => onChange && onChange(d ? d.toISOString() : null)}
        onClose={onBlur}
        minDate={dayjs(new Date())}
      />
    </LocalizationProvider>
  );
};

export default UIDatePicker;
