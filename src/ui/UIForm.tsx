import { INodeProps } from '@/types';
import { Button } from '@mui/material';
import styles from './UIForm.module.scss';

interface IProps extends INodeProps {
  submitBtnText: string;
  onSubmit: () => void | Promise<unknown>;
  isLoading?: boolean;
}

const UIForm = ({ children, className, submitBtnText, isLoading = false, onSubmit }: IProps) => {
  return (
    <form
      onSubmit={e => (e.preventDefault(), onSubmit())}
      className={[styles['form'], className].join(' ')}>
      {children}
      <Button
        className={styles['submit-btn']}
        type="submit"
        variant="contained"
        disabled={isLoading}>
        {submitBtnText}
      </Button>
    </form>
  );
};

export default UIForm;
