import { enqueueSnackbar } from 'notistack';

const DURATION = 3000;
export const useToast = () => {
  const showSuccess = (msg: string) =>
    enqueueSnackbar(msg, {
      autoHideDuration: DURATION,
      variant: 'success',
      anchorOrigin: { horizontal: 'right', vertical: 'top' },
    });

  const showFailed = (msg: string) =>
    enqueueSnackbar(msg, {
      autoHideDuration: DURATION,
      variant: 'error',
      anchorOrigin: { horizontal: 'right', vertical: 'top' },
    });

  return { showSuccess, showFailed };
};
