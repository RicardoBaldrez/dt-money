import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { PrivateRoutes } from '@/routes/PrivateRoutes';
import { PublicRoutes } from '@/routes/PublicRoutes';

const NavigationRoutes = () => {
  const [user, setUser] = useState(undefined);

  return <NavigationContainer>{user ? <PrivateRoutes /> : <PublicRoutes />}</NavigationContainer>;
};

export default NavigationRoutes;
