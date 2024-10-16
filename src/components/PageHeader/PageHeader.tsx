import UIContainer from '@/ui/UIContainer/UIContainer';
import styles from './PageHeader.module.scss';
import type { INodeProps } from '@/types';
import UICard from '@/ui/UICard/UICard';

interface IProps extends INodeProps {
  background?: 'accent' | 'primary' | 'secondary';
}

const PageHeader = ({ background = 'primary', children, styleClass }: IProps) => {
  return (
    <UIContainer>
      <UICard
        background={background}
        styleClass={[styles['container'], styleClass].join(' ')}>
        {' '}
        {children}{' '}
      </UICard>
    </UIContainer>
  );
};

export default PageHeader;
