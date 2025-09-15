import { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SystemBars} from 'react-native-edge-to-edge'

import { PublicRoutes } from "@/routes/PublicRoutes";
import { PrivateRoutes } from "@/routes/PrivateRoutes";
import { useAuthContext } from "@/context/auth.context";

const NavigationRoutes = () => {
  const { user, token } = useAuthContext();

  const Routes = useCallback(() => {
    if (!user || !token) {
      return <PublicRoutes />;
    }
    return <PrivateRoutes />;
  }, [user, token]);

  return (
    <NavigationContainer>
      <SystemBars style={"light"} />
      <Routes />
    </NavigationContainer>
  );
};

export default NavigationRoutes;
