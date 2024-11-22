import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import styles from './TicketSelectWithSeatModal.module.scss';

import { useState } from 'react';
import { useI18n } from '@/hooks/useI18n';
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

const getSeatsByClass = (seats: ISeat[]): Record<TicketClassName, ISeat[]> => {
  return {
    First: seats.filter(s => s.ticketClass === 'First'),
    Business: seats.filter(s => s.ticketClass === 'Business'),
    Economy: seats.filter(s => s.ticketClass === 'Economy'),
  };
};

const TicketSelectWithSeatModal = ({ flight, tickets, open, onClose, onConfirm, selectedState }: IProps) => {
  const { t } = useI18n();

  const { reservedSeats } = useReservedSeats(flight.id);
  const splittedSeats = getSeatsByClass(reservedSeats);

  const skip = getSkipByTicketClass(flight);

  const [selected, setSelected] = selectedState;
  const [localSelected, setLocalSelected] = useState(selected);

  const state = [
    {
      ticketClass: flight.ticketClasses?.find(tc => tc.name === 'First'),
      reserved: splittedSeats.First,
      skip: skip.First,
    },
    {
      ticketClass: flight.ticketClasses?.find(tc => tc.name === 'Business'),
      reserved: splittedSeats.Business,
      skip: skip.Business,
    },
    {
      ticketClass: flight.ticketClasses?.find(tc => tc.name === 'Economy'),
      reserved: splittedSeats.Economy,
      skip: skip.Economy,
    },
  ] as const satisfies Array<unknown>;

  const selectedData = localSelected
    ? t('flightPage', 'selectedSeat', { seat: localSelected.seat, name: t('tickets', localSelected.ticketClass.name) })
    : t('flightPage', 'notChosen');

  return (
    <Dialog
      className={styles['modal']}
      open={open}
      onClose={onClose}>
      <DialogTitle className={styles['title']}>
        {t('flightPage', 'chooseSeat')}
        <span className={styles['selected']}>{selectedData}</span>
      </DialogTitle>
      <DialogContent className={styles['container']}>
        {state.map(({ ticketClass, reserved, skip }) => {
          if (ticketClass) {
            return (
              <div key={ticketClass.id}>
                {t('tickets', ticketClass.name)}
                <div className={styles['class-section']}>
                  {Array(ticketClass.total)
                    .fill(0)
                    .map((_, i) => (
                      <Button
                        key={skip + i}
                        size="small"
                        variant={
                          localSelected?.seat === skip + i && localSelected.ticketClass.name === ticketClass.name
                            ? 'contained'
                            : 'outlined'
                        }
                        className={[styles['seat']].join(' ')}
                        disabled={
                          tickets.some(t => t.ticketClass === ticketClass.name) ||
                          reserved.some(s => s.seat === skip + i)
                        }
                        onClick={() => setLocalSelected({ ticketClass, seat: skip + i })}>
                        {skip + i}
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
          onClick={() => (setSelected(localSelected), onConfirm())}>
          {t('common', 'confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TicketSelectWithSeatModal;
