import UIIcon from '@/ui/UIIcon';
import { Card } from '@mui/material';

import styles from './FlightCard.module.scss';

import type { IFlight } from '@/types/flight';
import type { INodeProps } from '@/types';

interface IProps extends INodeProps {
  flight: IFlight;
}

const FlightCard = ({ flight }: IProps) => {
  const startDateTime = new Date(flight.date);
  const arrivingDateTime = new Date(new Date(flight.date).getTime() + flight.duration * 1000 * 60);

  return (
    <Card
      variant="outlined"
      className={styles['card']}>
      <span>
        {flight.route?.from} <span> {flight.departureAirportCode}</span> ---
        {flight.route?.to} <span> {flight.arrivingAirportCode}</span>
      </span>
      <div className={styles['company']}>
        <span>{flight.company}</span>
      </div>

      <div>
        <UIIcon
          size="16px"
          name="rub"
        />
      </div>

      <div className={styles['date-time']}>
        <p>
          {startDateTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} -{' '}
          {arrivingDateTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </Card>
  );
};

export default FlightCard;
