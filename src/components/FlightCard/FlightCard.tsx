import { Card, Label } from '@gravity-ui/uikit';
import styles from './FlightCard.module.scss';
import type { INodeProps } from '@/types';
import type { IFlight } from '@/types/flight';
import { ArrowRight, FaceAlien } from '@gravity-ui/icons';
import UIIcon from '@/ui/UIIcon/UIIcon';

interface IProps extends INodeProps {
  flight: IFlight;
}

const FlightCard = ({ flight }: IProps) => {
  const startDateTime = new Date(flight.date);
  const arrivingDateTime = new Date(new Date(flight.date).getTime() + flight.duration * 1000 * 60);

  return (
    <Card
      theme="info"
      view="filled"
      className={styles['card']}>
      <span>
        {' '}
        {flight.route.from} <Label theme="normal"> {flight.fromCode}</Label> <ArrowRight /> {flight.route.to}{' '}
        <Label theme="normal"> {flight.toCode}</Label>
      </span>
      <div className={styles['company']}>
        <FaceAlien />
        <Label theme="info">{flight.company}</Label>
      </div>

      <div>
        {flight.minCost}{' '}
        <UIIcon
          size="16px"
          name="rub"
        />{' '}
      </div>

      <div className={styles['date-time']}>
        <Label theme="info">
          {startDateTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} -{' '}
          {arrivingDateTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
        </Label>
      </div>
    </Card>
  );
};

export default FlightCard;
