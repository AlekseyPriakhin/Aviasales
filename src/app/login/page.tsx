import LoginForm from '@/components/Login/LoginForm';
import UIPageContent from '@/ui/UIPageContent';
import UIPageHeader from '@/ui/UIPageHeader';
import UITitle from '@/ui/UITitle';

import styles from './page.module.scss';

const LoginPage = () => {
  return (
    <>
      <UIPageHeader contentClass={styles['title']}>
        <UITitle title="Авторизация" />
      </UIPageHeader>
      <UIPageContent>
        <LoginForm />
      </UIPageContent>
    </>
  );
};

export default LoginPage;
