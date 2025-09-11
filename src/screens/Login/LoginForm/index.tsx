import { useForm } from "react-hook-form";
import { Text } from "react-native";
import { AppInput } from "@/components/AppInput";

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
        leftIconName="lock"
        placeholder="Sua senha"
        secureTextEntry
      />
    </>
  );
};
