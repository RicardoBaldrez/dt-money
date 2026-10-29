import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { type StackNavigationProp } from '@react-navigation/stack';

import { DismissKeyboardView } from '@/components/DismissKeyboardView';
import { type PublicStackParamList } from '@/routes/PublicRoutes';

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
