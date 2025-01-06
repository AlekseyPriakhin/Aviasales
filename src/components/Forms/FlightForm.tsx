import type { INodeProps } from '@/types';
import { IFlight } from '@/types/flight';
import UIDatePicker from '@/ui/inputs/UIDatePicker';
import UIForm from '@/ui/UIForm';
import { TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import TicketClassForm from '@/components/Forms/TicketClassForm';
import { TicketClassName } from '@/types/ticketClass';

interface IProps extends INodeProps {
  flight?: IFlight;
}

interface IFormData {
  company: string;
  date: string;
  duration: number; //minutes
  classesCounts: Record<TicketClassName, number>;
}

export default function FlightForm({ flight }: IProps) {
  const { register, control, handleSubmit } = useForm<IFormData>({
    defaultValues: {
      company: flight?.company || '',
      date: flight?.date.toString() || '',
      duration: flight?.duration || 0,
      classesCounts: {
        Business: flight?.ticketClasses?.find(c => c.name === 'Business')?.total || 0,
        Economy: flight?.ticketClasses?.find(c => c.name === 'Economy')?.total || 0,
        First: flight?.ticketClasses?.find(c => c.name === 'First')?.total || 0,
      },
    },
  });

  const isUpdate = !!flight;

  return (
    <UIForm
      onSubmit={handleSubmit(d => console.log(d))}
      submitBtnText={isUpdate ? 'Сохранить' : 'Создать'}>
      <TextField
        label="Компания"
        {...register('company')}
      />
      <Controller
        control={control}
        name="date"
        render={({ field: { onBlur, onChange, value } }) => (
          <UIDatePicker
            value={value}
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="classesCounts"
        render={({ field: { onChange, value } }) => (
          <TicketClassForm
            value={value}
            onChange={onChange}
          />
        )}
      />
    </UIForm>
  );
}
