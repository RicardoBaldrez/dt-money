import { useForm } from "react-hook-form";
import { Text } from "react-native";
import { AppInput } from "../../../components/AppInput";

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
      <Text className="text-white">Login FORM</Text>
      <AppInput
        control={control}
        name="email"
        label="Email"
        leftIconName="email"
        placeholder="mail@example.com.br"
      />
    </>
  );
};
