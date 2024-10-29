import UIContainer from '@/ui/UIContainer/UIContainer';
import styles from './PageHeader.module.scss';
import type { INodeProps } from '@/types';
import UICard from '@/ui/UICard/UICard';

interface IProps extends INodeProps {
  background?: 'accent' | 'primary' | 'secondary';
}

const PageHeader = ({ background = 'primary', children, className }: IProps) => {
  return (
    <UIContainer>
      <UICard
        background={background}
        className={[styles['container'], className].join(' ')}>
        {children}
      </UICard>
    </UIContainer>
  );
};

export default PageHeader;
