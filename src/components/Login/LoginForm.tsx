'use client';
import UIForm from '@/ui/UIForm';
import { TextField } from '@mui/material';

import { signIn, SignInResponse } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
// import { useForm } from 'react-hook-form';

import styles from './LoginForm.module.scss';

// interface IFormData {
//   mail: string;
//   password: string;
// }

const LoginForm = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  // const { register, setValue, handleSubmit } = useForm<IFormData>({
  //   values: {
  //     mail: '',
  //     password: '',
  //   },
  // });

  const router = useRouter();
  const { showFailed } = useToast();

  const onSuccess = () => router.push('/');
  const onError = () => (showFailed('Неправильный логин или пароль'), setPassword(''));

  const onResponse = (response: SignInResponse | undefined) => {
    if (!response) return;

    if (response.error) onError();
    else onSuccess();
  };

  return (
    <UIForm
      onSubmit={() => signIn('credentials', { mail, password, redirect: false }).then(onResponse)}
      submitBtnText="Войти"
      className={styles['form']}>
      <TextField
        name="mail"
        label="Почта"
        variant="outlined"
        value={mail}
        onChange={e => setMail(e.target.value)}
      />

      <TextField
        name="password"
        label="Пароль"
        variant="outlined"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
    </UIForm>
  );
};

export default LoginForm;
