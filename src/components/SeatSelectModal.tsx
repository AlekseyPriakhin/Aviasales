import { useI18n } from '@/hooks/useI18n';
import styles from './SeatSelect.module.scss';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { useReservedSeats } from '@/queries/flights';

import { getSkipByTicketClass } from '@/helpers';

import type { INodeProps } from '@/types';
import type { ISeat, ITicket } from '@/types/ticket';
import type { IFlight } from '@/types/flight';
import type { ITicketClass, TicketClassName } from '@/types/ticketClass';

interface IProps extends INodeProps {
  flight: IFlight;
  tickets: ITicket[];
  open: boolean;
  selectedState: [
    { ticketClass: ITicketClass; seat: number } | null,
    (prev: { ticketClass: ITicketClass; seat: number } | null) => void,
  ];
  onClose: () => void;
  onConfirm: () => void;
}

const getSeatsByClass = (seats: ISeat[]): Record<Lowercase<TicketClassName>, ISeat[]> => {
  return {
    first: seats.filter(s => s.ticketClass === 'First'),
    business: seats.filter(s => s.ticketClass === 'Business'),
    economy: seats.filter(s => s.ticketClass === 'Economy'),
  };
};

const SeatSelectModal = ({ flight, open, onClose, onConfirm, selectedState }: IProps) => {
  const { reservedSeats } = useReservedSeats(flight.id);
  const splittedSeats = getSeatsByClass(reservedSeats);

  const skip = getSkipByTicketClass(flight);

  const [selected, setSelected] = selectedState;
  const { t } = useI18n();

  const state = [
    {
      ticketClass: flight.ticketClasses?.find(tc => tc.name === 'First'),
      reserved: splittedSeats.first,
      first: skip.First,
    },
    {
      ticketClass: flight.ticketClasses?.find(tc => tc.name === 'Business'),
      reserved: splittedSeats.business,
      first: skip.Business,
    },
    {
      ticketClass: flight.ticketClasses?.find(tc => tc.name === 'Economy'),
      reserved: splittedSeats.economy,
      first: skip.Economy,
    },
  ] as const satisfies Array<unknown>;

  return (
    <Dialog
      className={styles['modal']}
      open={open}
      onClose={onClose}>
      <DialogTitle className={styles['title']}>
        {t('flightPage', 'chooseSeat')}
        <span className={styles['selected']}>
          {selected
            ? t('flightPage', 'selectedSeat', { seat: selected.seat, name: t('tickets', selected.ticketClass.name) })
            : t('flightPage', 'notChosen')}
        </span>
      </DialogTitle>
      <DialogContent className={styles['container']}>
        {state.map(({ ticketClass, reserved, first }) => {
          if (ticketClass) {
            return (
              <div key={ticketClass.id}>
                {t('tickets', ticketClass.name)}
                <div className={styles['class-section']}>
                  {Array(ticketClass.total)
                    .fill(0)
                    .map((_, i) => (
                      <Button
                        key={first + i}
                        size="small"
                        variant={
                          selected?.seat === first + i && selected.ticketClass.name === ticketClass.name
                            ? 'contained'
                            : 'outlined'
                        }
                        className={[styles['seat']].join(' ')}
                        disabled={reserved.some(s => s.seat === first + i)}
                        onClick={() => setSelected({ ticketClass, seat: first + i })}>
                        {first + i}
                      </Button>
                    ))}
                </div>
              </div>
            );
          }
        })}
      </DialogContent>
      <DialogActions className={styles['actions']}>
        <Button
          variant="contained"
          onClick={onClose}>
          {t('common', 'cancel')}
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={onConfirm}>
          {t('common', 'confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SeatSelectModal;
