import { IFlight } from '@/types/flight';
import { TicketClassName } from '@/types/ticketClass';
import { TextField } from '@mui/material';

interface IProps {
  flight?: IFlight;
  value: Record<TicketClassName, number>;
  onChange: (counts: Record<TicketClassName, number>) => void;
}

const TicketClassForm = ({ value, onChange }: IProps) => {
  const classes: TicketClassName[] = ['First', 'Business', 'Economy'];

  return (
    <>
      {classes.map(c => (
        <TextField
          key={c}
          type="number"
          label={c}
          value={value[c]}
          onChange={e => onChange({ ...value, [c]: Number(e.target.value) })}
        />
      ))}
    </>
  );
};

export default TicketClassForm;
