import { Card, Chip } from '@mui/material';
import UIIcon from '@/ui/UIIcon';

import styles from './FlightCard.module.scss';
import { useState } from 'react';

import type { IFlight } from '@/types/flight';
import type { INodeProps } from '@/types';

interface IProps extends INodeProps {
  flight: IFlight;
}

const FlightCard = ({ flight }: IProps) => {
  const [hover, setHover] = useState(false);
  const startDateTime = new Date(flight.date);
  const arrivingDateTime = new Date(new Date(flight.date).getTime() + flight.duration * 1000 * 60);

  const startDate = startDateTime.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  const arrivingDate = arrivingDateTime.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  const date = startDate === arrivingDate ? startDate : `${startDate} - ${arrivingDate}`;

  return (
    <Card
      variant="outlined"
      className={styles['card']}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <div className={styles['route']}>
        <div className={styles['from-to']}>
          {flight.route?.from}
          <Chip
            color="success"
            variant={hover ? 'filled' : 'outlined'}
            label={flight.departureAirportCode}
          />
        </div>

        <UIIcon name="arrow-right" />

        <div className={styles['from-to']}>
          {flight.route?.to}
          <Chip
            color="info"
            variant={hover ? 'filled' : 'outlined'}
            label={flight.arrivingAirportCode}
          />
        </div>
      </div>
      <div className={styles['company']}>
        <span>{flight.company}</span>
      </div>

      <div className={styles['date-time']}>
        <UIIcon name="time" />
        <span>
          {startDateTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} {' - '}
          {arrivingDateTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
        </span>

        <UIIcon name="calendar" />
        <span>{date}</span>
      </div>
    </Card>
  );
};

export default FlightCard;
