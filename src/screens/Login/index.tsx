import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { type StackNavigationProp } from '@react-navigation/stack';

import { type PublicStackParamList } from '@/routes';

export const Login = () => {
  const navigation = useNavigation<StackNavigationProp<PublicStackParamList>>();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Tela de Login</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};
