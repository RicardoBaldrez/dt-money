import { NavigationContainer } from "@react-navigation/native";
import { PublicRoutes } from "@/routes/PublicRoutes";
import { PrivateRoutes } from "@/routes/PrivateRoutes";
import { useCallback, useState } from "react";

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
      <Routes />
    </NavigationContainer>
  );
};

export default NavigationRoutes;
