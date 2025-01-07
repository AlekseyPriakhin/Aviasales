import LocalizationProvider from '@/providers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

interface IProps {
  label: string;
  value: string;
  onChange: (date?: string | null) => void;
  onBlur?: () => void;
}

const UITimePicker = ({ label, value, onChange, onBlur }: IProps) => {
  return (
    <LocalizationProvider>
      <TimePicker
        label={label}
        value={dayjs(value)}
        onChange={v => onChange(v?.toString())}
        onClose={onBlur}
      />
    </LocalizationProvider>
  );
};

export default UITimePicker;
