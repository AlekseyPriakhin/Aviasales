import { INodeProps } from '@/types';
import { Button } from '@mui/material';
import styles from './UIForm.module.scss';

interface IProps extends INodeProps {
  submitBtnText: string;
  onSubmit: () => void | Promise<unknown>;
}

const UIForm = ({ children, className, submitBtnText, onSubmit }: IProps) => {
  return (
    <form
      onSubmit={e => (e.preventDefault(), onSubmit())}
      className={[className, styles['form']].join(' ')}>
      {children}
      <Button
        type="submit"
        variant="contained">
        {submitBtnText}
      </Button>
    </form>
  );
};

export default UIForm;
