import UIDatePicker from '@/ui/inputs/UIDatePicker';
import UIForm from '@/ui/UIForm';
import TicketClassForm from '@/components/Forms/TicketClassForm';
import { MenuItem, Select, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useInfiniteRoutes } from '@/queries/routes';
import { useCreateFlight, useUpdateFlight } from '@/queries/flights';
import { useToast } from '@/hooks/useToast';

import type { TicketClassName } from '@/types/ticketClass';
import type { INodeProps } from '@/types';
import type { IFlight } from '@/types/flight';

interface IProps extends INodeProps {
  flight?: IFlight;
  onSubmit?: () => void;
}

interface IFormData {
  company: string;
  departureAirport: string;
  departureAirportCode: string;
  arrivingAirport: string;
  arrivingAirportCode: string;
  date: string;
  duration: number;
  ticketClasses: Record<TicketClassName, ITicketClassFormData>;
  routeId: string;
}

export interface ITicketClassFormData {
  id?: number;
  name: TicketClassName;
  total: number;
  cost: number;
}

const schema = yup
  .object()
  .shape({
    company: yup.string().required(),
    departureAirport: yup.string().required(),
    departureAirportCode: yup.string().required().length(3, 'Код должен состоять из 3 символов'),
    arrivingAirport: yup.string().required(),
    arrivingAirportCode: yup.string().required().length(3, 'Код должен состоять из 3 символов'),
    date: yup.string().required(),
    duration: yup.number().required(),
    ticketClasses: yup.object().required(),
    routeId: yup.string().required(),
  })
  .required();

export default function FlightForm({ flight, onSubmit: onSubmitCb }: IProps) {
  const {
    formState: { errors },
    register,
    control,
    handleSubmit,
  } = useForm<IFormData>({
    defaultValues: {
      company: flight?.company || '',
      date: flight?.date.toString() || new Date().toString(),
      duration: flight?.duration || 0,
      arrivingAirport: flight?.arrivingAirport || '',
      arrivingAirportCode: flight?.arrivingAirportCode || '',
      departureAirport: flight?.departureAirport || '',
      departureAirportCode: flight?.departureAirportCode || '',
      routeId: String(flight?.routeId) || '',
      ticketClasses: {
        First: {
          id: flight?.ticketClasses?.find(c => c.name === 'First')?.id,
          name: 'First',
          total: flight?.ticketClasses?.find(c => c.name === 'First')?.total || 0,
          cost: flight?.ticketClasses?.find(c => c.name === 'First')?.cost || 0,
        },
        Business: {
          id: flight?.ticketClasses?.find(c => c.name === 'Business')?.id,
          name: 'Business',
          total: flight?.ticketClasses?.find(c => c.name === 'Business')?.total || 0,
          cost: flight?.ticketClasses?.find(c => c.name === 'Business')?.cost || 0,
        },
        Economy: {
          id: flight?.ticketClasses?.find(c => c.name === 'Economy')?.id,
          name: 'Economy',
          total: flight?.ticketClasses?.find(c => c.name === 'Economy')?.total || 0,
          cost: flight?.ticketClasses?.find(c => c.name === 'Economy')?.cost || 0,
        },
      },
    },
    resolver: yupResolver(schema) as any,
  });

  const { showSuccess, showFailed } = useToast();

  const { routes, isLoading: isRoutesLoading } = useInfiniteRoutes({ per: 100 });

  const isUpdate = !!flight;

  const { createFlight } = useCreateFlight();
  const { updateFlight } = useUpdateFlight(flight?.id as number);

  const onSubmit = (params: IFormData) => {
    const handler = isUpdate ? updateFlight : createFlight;

    handler({
      params: {
        ...params,
        duration: Number(params.duration),
        routeId: Number(params.routeId),
        ticketClasses: Object.values(params.ticketClasses),
      },
      options: {
        onSuccess: () => (showSuccess(isUpdate ? 'Рейс обновлен' : 'Рейс создан'), onSubmitCb?.()),
        onError: () => showFailed(isUpdate ? 'Не удалось обновить рейс' : 'Не удалось создать рейс'),
      },
    });
  };

  if (isRoutesLoading) return <div>Загрузка</div>;

  return (
    <UIForm
      onSubmit={handleSubmit(onSubmit)}
      submitBtnText={isUpdate ? 'Сохранить' : 'Создать'}>
      <TextField
        label="Компания"
        required
        {...register('company')}
      />
      <Controller
        control={control}
        name="date"
        render={({ field: { onBlur, onChange, value } }) => (
          <UIDatePicker
            label="Дата"
            value={value}
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
      />

      <TextField
        label="Длительность"
        required
        helperText="Длительность указывается в минутах"
        type="number"
        {...register('duration')}
      />

      <TextField
        label="Аэропорт отправления"
        required
        {...register('departureAirport')}
      />

      <Controller
        control={control}
        name="departureAirportCode"
        render={({ field: { onChange, ...fields } }) => (
          <TextField
            label="Код аэропорта отправления"
            required
            error={!!errors.departureAirportCode}
            helperText={errors.departureAirportCode?.message}
            onChange={e => onChange(e.target.value.toUpperCase())}
            {...fields}
          />
        )}
      />

      <TextField
        label="Аэропорт прибытия"
        required
        {...register('arrivingAirport')}
      />

      <Controller
        control={control}
        name="arrivingAirportCode"
        render={({ field: { onChange, ...fields } }) => (
          <TextField
            label="Код аэропорта прибытия"
            required
            error={!!errors.arrivingAirportCode}
            helperText={errors.arrivingAirportCode?.message}
            onChange={e => onChange(e.target.value.toUpperCase())}
            {...fields}
          />
        )}
      />

      <Controller
        control={control}
        name="routeId"
        render={({ field: { onChange, onBlur, value } }) => (
          <Select
            label="Маршрут"
            required
            value={value}
            onChange={onChange}
            onBlur={onBlur}>
            {routes.map(r => (
              <MenuItem
                value={r.id}
                key={r.id}>
                {r.from} - {r.to}
              </MenuItem>
            ))}
          </Select>
        )}
      />

      <Controller
        control={control}
        name="ticketClasses"
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
