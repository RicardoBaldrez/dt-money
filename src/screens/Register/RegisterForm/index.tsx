import { Text, View } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

import { type PublicStackParamList } from '@/routes/PublicRoutes';

import { schema } from '@/screens/Register/RegisterForm/schema';

import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';

interface FormregisterParams {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    // formState: { isSubmitting },
  } = useForm<FormregisterParams>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation<NavigationProp<PublicStackParamList>>();

  const onSubmit = async () => {};

  const handleRegister = handleSubmit(onSubmit);

  return (
    <>
      <AppInput
        control={control}
        name="name"
        leftIconName="person"
        label="NOME"
        placeholder="Seu nome"
      />
      <AppInput
        control={control}
        name="email"
        leftIconName="mail-outline"
        label="EMAIL"
        placeholder="mail@exemplo.com"
      />
      <AppInput
        control={control}
        name="password"
        leftIconName="lock-outline"
        label="SENHA"
        placeholder="Sua senha"
        secureTextEntry
      />
      <AppInput
        control={control}
        name="confirmPassword"
        leftIconName="lock-outline"
        label="SENHA"
        placeholder="Confirme sua senha"
        secureTextEntry
      />
      <View className="mb-6 mt-8 min-h-[250px] flex-1 justify-between">
        <AppButton iconName="arrow-forward" onPress={() => handleRegister()}>
          Cadastrar
        </AppButton>
        <View>
          <Text className="mb-6 text-base text-gray-300">Já possui uma conta?</Text>
          <AppButton
            mode="outline"
            iconName="arrow-forward"
            onPress={() => navigation.navigate('Login')}
          >
            Acessar
          </AppButton>
        </View>
      </View>
    </>
  );
};
