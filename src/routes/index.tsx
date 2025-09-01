import { NavigationContainer } from "@react-navigation/native";
import { PublicRoutes } from "@/routes/PublicRoutes";
import { PrivateRoutes } from "@/routes/PrivateRoutes";
import { useCallback, useState } from "react";
import { SystemBars} from 'react-native-edge-to-edge'

const NavigationRoutes = () => {
  const [user, setUser] = useState(undefined);

  const Routes = useCallback(() => {
    if (!user) {
      return <PublicRoutes />;
    }
    return <PrivateRoutes />;
  }, [user]);

  return (
    <NavigationContainer>
      <SystemBars style={"light"} />
      <Routes />
    </NavigationContainer>
  );
};

export default NavigationRoutes;
