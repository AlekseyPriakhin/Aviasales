import { useI18n } from '@/hooks/useI18n';
import styles from './SeatSelect.module.scss';

import { useState } from 'react';
import { useReservedSeats } from '@/queries/flights';

import type { INodeProps } from '@/types';
import type { ISeat, ITicket } from '@/types/ticket';
import type { ITicketClass, TicketClassName } from '@/types/ticketClass';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';

interface IProps extends INodeProps {
  flightId: number;
  ticketClasses: ITicketClass[];
  tickets: ITicket[];
  open: boolean;
  onClose: () => void;
}

const getSeatsByClass = (seats: ISeat[]): Record<Lowercase<TicketClassName>, ISeat[]> => {
  return {
    first: seats.filter(s => s.ticketClass === 'First'),
    business: seats.filter(s => s.ticketClass === 'Business'),
    economy: seats.filter(s => s.ticketClass === 'Economy'),
  };
};

const SeatSelectModal = ({ ticketClasses, flightId, open, onClose }: IProps) => {
  const { reservedSeats } = useReservedSeats(flightId);
  const splittedSeats = getSeatsByClass(reservedSeats);

  const [selected, setSelected] = useState<{ seat: number; name: TicketClassName } | null>(null);
  const { t } = useI18n();

  const state = [
    {
      ticketClass: ticketClasses.find(tc => tc.name === 'First'),
      reserved: splittedSeats.first,
    },
    {
      ticketClass: ticketClasses.find(tc => tc.name === 'Business'),
      reserved: splittedSeats.business,
    },
    {
      ticketClass: ticketClasses.find(tc => tc.name === 'Economy'),
      reserved: splittedSeats.economy,
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
            ? t('flightPage', 'selectedSeat', { seat: selected.seat, name: t('tickets', selected.name) })
            : t('flightPage', 'notChosen')}
        </span>
      </DialogTitle>
      <DialogContent className={styles['container']}>
        {state.map(({ ticketClass, reserved }) => {
          if (ticketClass) {
            return (
              <div key={ticketClass.id}>
                {t('tickets', ticketClass.name)}
                <div className={styles['class-section']}>
                  {Array(ticketClass.total)
                    .fill(0)
                    .map((_, i) => (
                      <Button
                        key={i}
                        size="small"
                        variant={
                          selected?.seat === i + 1 && selected.name === ticketClass.name ? 'contained' : 'outlined'
                        }
                        className={[styles['seat']].join(' ')}
                        disabled={reserved.some(s => s.seat === i + 1)}
                        onClick={() => setSelected({ seat: i + 1, name: ticketClass.name })}>
                        {i + 1}
                      </Button>
                    ))}
                </div>
              </div>
            );
          }
        })}
      </DialogContent>
    </Dialog>
  );
};

export default SeatSelectModal;
