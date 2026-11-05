import { useForm } from 'react-hook-form';

import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';

export interface FormLoginParams {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    control,
    // handleSubmit,
    // formState: { isSubmitting },
  } = useForm<FormLoginParams>();

  return (
    <>
      <AppInput
        control={control}
        name="email"
        label="EMAIL"
        leftIconName="mail-outline"
        placeholder="mail@example.com"
      />
      <AppInput
        control={control}
        name="password"
        label="SENHA"
        leftIconName="lock-outline"
        placeholder="Sua senha"
        secureTextEntry
      />
      <AppButton mode="fill" iconName="arrow-forward">
        Login
      </AppButton>
    </>
  );
};
