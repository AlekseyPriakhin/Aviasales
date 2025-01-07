'use client';
import { INodeProps } from '@/types';
import { IRoute } from '@/types/route';
import UIForm from '@/ui/UIForm';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCreateRoute, useUpdateRoute } from '@/queries/routes';
import { useToast } from '@/hooks/useToast';

interface IProps extends INodeProps {
  route?: IRoute;
  onSubmit?: () => void;
}

interface IFormData {
  from: string;
  to: string;
  description: string;
}

const schema = yup
  .object()
  .shape({
    from: yup.string().required(),
    to: yup.string().required().min(3, 'Минимум 3 символа'),
    description: yup.string().required(),
  })
  .required();

const RouteForm = ({ route, onSubmit: onSubmitCb }: IProps) => {
  const { createRoute } = useCreateRoute();
  const { updateRoute } = useUpdateRoute(route?.id);

  const isUpdate = !!route;

  const { showFailed, showSuccess } = useToast();

  const onSubmit = (params: IFormData) => {
    const handler = isUpdate ? updateRoute : createRoute;

    handler({
      params,
      options: {
        onSuccess: () => (showSuccess(isUpdate ? 'Маршрут обновлен' : 'Маршрут создан'), onSubmitCb?.()),
        onError: () => showFailed(isUpdate ? 'Не удалось обновить маршрут' : 'Не удалось создать маршрут'),
      },
    });
  };

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<IFormData>({
    defaultValues: {
      description: route?.description || '',
      from: route?.from || '',
      to: route?.from || '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <UIForm
      submitBtnText={isUpdate ? 'Сохранить' : 'Создать'}
      onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Откуда"
        {...register('from')}
        error={!!errors.from}
        helperText={errors.from?.message}
      />
      <TextField
        label="Куда"
        {...register('to')}></TextField>
      <TextField
        label="Описание"
        {...register('description')}></TextField>
    </UIForm>
  );
};

export default RouteForm;
