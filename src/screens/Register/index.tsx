import { View } from 'react-native';

import { RegisterForm } from '@/screens/Register/RegisterForm';

import { AuthHeader } from '@/components/AuthHeader';
import { DismissKeyboardView } from '@/components/DismissKeyboardView';

export const Register = () => {
  return (
    <DismissKeyboardView>
      <View className="w-[82%] flex-1 self-center">
        <AuthHeader />
        <RegisterForm />
      </View>
    </DismissKeyboardView>
  );
};
