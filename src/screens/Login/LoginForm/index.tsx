import { View, Text } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";

import { AppInput } from "@/components/AppInput";
import { AppButton } from "@/components/AppButton";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { schema } from "./schema";

export interface FormLoginParams {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema)
  });

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();

  const onSubmit = async () => {};

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

      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <AppButton onPress={handleSubmit(onSubmit)} iconName="arrow-forward">Login</AppButton>
        <View>
          <Text className="mb-6 text-gray-300 text-base">Ainda não possui uma conta?</Text>
          <AppButton onPress={() => navigation.navigate("Register")} iconName="arrow-forward" mode="outline">
            Cadastrar
          </AppButton>
        </View>
      </View>
    </>
  );
};
