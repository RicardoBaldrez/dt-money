import { View, Text } from "react-native";
import { useForm } from "react-hook-form";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { AppInput } from "@/components/AppInput";
import { AppButton } from "@/components/AppButton";
import { PublicStackParamsList } from "@/routes/PublicRoutes";

interface RegisterFormParams {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormParams>();

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();

  return (
    <>
      <AppInput
        control={control}
        name="name"
        label="NOME"
        leftIconName="person"
        placeholder="Seu nome"
      />
      <AppInput
        control={control}
        name="email"
        label="EMAIL"
        leftIconName="mail-outline"
        placeholder="mail@example.br"
      />
      <AppInput
        control={control}
        name="password"
        label="SENHA"
        leftIconName="lock-outline"
        placeholder="Sua senha"
        secureTextEntry
      />
      <AppInput
        control={control}
        name="confirmPassword"
        label="SENHA"
        leftIconName="lock-outline"
        placeholder="Confirme sua senha"
        secureTextEntry
      />
      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <AppButton iconName="arrow-forward">Cadastrar</AppButton>
        <View>
          <Text className="mb-6 text-gray-300 text-base">Já possui uma conta?</Text>
          <AppButton onPress={() => navigation.navigate("Login")} iconName="arrow-forward" mode="outline">
            Acessar
          </AppButton>
        </View>
      </View>
    </>
  );
};
