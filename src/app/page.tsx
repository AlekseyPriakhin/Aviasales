'use client';

import UIContainer from '@/ui/ui-container/ui-container';
import styles from './page.module.scss';

const Page = () => {
  return (
    <UIContainer>
      <div className={styles['slides']}></div>
    </UIContainer>
  );
};

export default Page;
