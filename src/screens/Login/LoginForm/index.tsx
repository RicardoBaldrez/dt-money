import { Text, View } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

import { type PublicStackParamList } from '@/routes/PublicRoutes';

import { schema } from '@/screens/Login/LoginForm/schema';

import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';

export interface FormLoginParams {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    // formState: { isSubmitting },
  } = useForm<FormLoginParams>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation<NavigationProp<PublicStackParamList>>();

  const onSubmit = async () => {};

  const handleLogin = handleSubmit(onSubmit);

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

      <View className="mb-6 mt-8 min-h-[250px] flex-1 justify-between">
        <AppButton iconName="arrow-forward" onPress={() => handleLogin()}>
          Login
        </AppButton>
        <View>
          <Text className="mb-6 text-base text-gray-300">Ainda não possui uma conta?</Text>
          <AppButton
            mode="outline"
            iconName="arrow-forward"
            onPress={() => navigation.navigate('Register')}
          >
            Cadastrar
          </AppButton>
        </View>
      </View>
    </>
  );
};
