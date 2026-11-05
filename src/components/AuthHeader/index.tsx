import { Image, View } from 'react-native';

import { useKeyboardVisible } from '@/shared/hooks/useKeyboardVisible';

export const AuthHeader = () => {
  const keyboardIsVisible = useKeyboardVisible();

  if (keyboardIsVisible) return <></>;

  return (
    <View className="min-h-40 w-full items-center justify-center">
      <Image source={require('@/assets/Logo.png')} className="h-[48px] w-[255px]" />
    </View>
  );
};
