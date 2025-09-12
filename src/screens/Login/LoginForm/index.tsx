import { useForm } from "react-hook-form";
import { AppInput } from "@/components/AppInput";
import { AppButton } from "@/components/AppButton";

export interface FormLoginParams {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>();

  return (
    <>
      <AppInput
        control={control}
        name="email"
        label="EMAIL"
        leftIconName="mail-outline"
        placeholder="mail@example.com.br"
      />
      <AppInput
        control={control}
        name="password"
        label="SENHA"
        leftIconName="lock-outline"
        placeholder="Sua senha"
        secureTextEntry
      />
      <AppButton iconName="arrow-forward">Login</AppButton> 
    </>
  );
};
