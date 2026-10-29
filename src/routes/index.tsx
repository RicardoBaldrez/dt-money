import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { PrivateRoutes } from '@/routes/PrivateRoutes';
import { PublicRoutes } from '@/routes/PublicRoutes';

const NavigationRoutes = () => {
  const [user, setUser] = useState(undefined);

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      {user ? <PrivateRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  );
};

export default NavigationRoutes;
