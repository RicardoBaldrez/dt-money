import { createStackNavigator } from '@react-navigation/stack';

import { Login } from '@/screens/Login';
import { Register } from '@/screens/Register';

export type PublicStackParamList = {
  Login: undefined;
  Register: undefined;
};

const PublicStack = createStackNavigator<PublicStackParamList>();

export const PublicRoutes = () => {
  return (
    <PublicStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <PublicStack.Screen name="Login" component={Login} />
      <PublicStack.Screen name="Register" component={Register} />
    </PublicStack.Navigator>
  );
};
