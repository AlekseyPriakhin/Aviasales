import UIContainer from '@/ui/ui-container/ui-container';
import { Button } from '@gravity-ui/uikit';

import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.page}>
      <UIContainer>
        <Button
          type="button"
          size="xl"
          view="action">
          Click me
        </Button>
      </UIContainer>
    </div>
  );
}
