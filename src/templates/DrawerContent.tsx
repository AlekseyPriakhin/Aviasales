import { INodeProps } from '@/types';

import styles from './DrawerContent.module.scss';

interface IProps extends INodeProps {
  title: string;
}

const DrawerContent = ({ title, children }: IProps) => {
  return (
    <div className={styles['container']}>
      <div className={styles['title']}>
        <h4>{title}</h4>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DrawerContent;
