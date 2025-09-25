import { useCallback, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SystemBars} from 'react-native-edge-to-edge'

import { PublicRoutes } from "@/routes/PublicRoutes";
import { PrivateRoutes } from "@/routes/PrivateRoutes";
import { useAuthContext } from "@/context/auth.context";
import { Loading } from "@/screens/Loading";

const NavigationRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useAuthContext();

  const Routes = useCallback(() => {
    if (isLoading) {
      return <Loading setIsLoading={setIsLoading} />;
    }
    if (!user || !token) {
      return <PublicRoutes />;
    }
    return <PrivateRoutes />;
  }, [user, token, isLoading]);

  return (
    <NavigationContainer>
      <SystemBars style={"light"} />
      <Routes />
    </NavigationContainer>
  );
};

export default NavigationRoutes;
