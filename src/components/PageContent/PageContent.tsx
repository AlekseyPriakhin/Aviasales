import { INodeProps } from '@/types';
import UIContainer from '@/ui/UIContainer/UIContainer';
import styles from './PageContent.module.scss';
import UICard from '@/ui/UICard/UICard';

interface IProps extends INodeProps {
  background?: 'primary' | 'secondary' | 'accent';
}

const PageContent = ({ background = 'primary', styleClass, children }: IProps) => {
  const containerClasses = [styles['container']].join(' ');
  const contentClasses = [styleClass, styles['content']].join(' ');

  return (
    <UIContainer styleClass={containerClasses}>
      <UICard
        styleClass={contentClasses}
        background={background}>
        {' '}
        {children}
      </UICard>
    </UIContainer>
  );
};

export default PageContent;
