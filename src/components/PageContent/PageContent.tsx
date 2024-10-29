import { INodeProps } from '@/types';
import UIContainer from '@/ui/UIContainer/UIContainer';
import styles from './PageContent.module.scss';
import UICard from '@/ui/UICard/UICard';

interface IProps extends INodeProps {
  background?: 'primary' | 'secondary' | 'accent' | 'transparent';
}

const PageContent = ({ background = 'transparent', className, children }: IProps) => {
  const containerClasses = [styles['container']].join(' ');
  const contentClasses = [className, styles['content']].join(' ');

  return (
    <UIContainer className={containerClasses}>
      {children}
      <UICard
        className={contentClasses}
        background={background}>
        {' '}
      </UICard>
    </UIContainer>
  );
};

export default PageContent;
