import { Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { type StackNavigationProp } from '@react-navigation/stack';

import { type PublicStackParamList } from '@/routes/PublicRoutes';

import { DismissKeyboardView } from '@/components/DismissKeyboardView';

export const Login = () => {
  const navigation = useNavigation<StackNavigationProp<PublicStackParamList>>();

  return (
    <DismissKeyboardView>
      <Text>Tela de Login</Text>
      <TextInput className="w-full bg-gray-500" />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text>Register</Text>
      </TouchableOpacity>
    </DismissKeyboardView>
  );
};
