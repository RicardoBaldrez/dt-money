import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '@/screens/Home';

type PrivateStackParamList = {
  Home: undefined;
};

const PrivateStack = createStackNavigator<PrivateStackParamList>();

export const PrivateRoutes = () => {
  return (
    <PrivateStack.Navigator screenOptions={{ headerShown: false }}>
      <PrivateStack.Screen name="Home" component={Home} />
    </PrivateStack.Navigator>
  );
};
