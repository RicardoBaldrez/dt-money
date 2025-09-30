import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "@/screens/Home";

type PrivateStackParamsList = {
  Home: undefined;
};

export const PrivateRoutes = () => {
  const PrivateStack = createStackNavigator<PrivateStackParamsList>();

  return (
    <PrivateStack.Navigator screenOptions={{ headerShown: false }}>
      <PrivateStack.Screen name="Home" component={Home} />
    </PrivateStack.Navigator>
  );
};