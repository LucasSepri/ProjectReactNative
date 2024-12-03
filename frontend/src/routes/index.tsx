import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppRoutes from './app.routes';
import AdminRoutes from './admin.routes';
import ReceptionistRoutes from './receptionist.routes';

import { AuthContext } from "../context/AuthContext";

const Routes: React.FC = () => {
  const { isAuthenticated, loading, user } = useContext(AuthContext);

  if (!isAuthenticated) {
    return (
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      {user.isAdmin ? (<AdminRoutes />) : (user.isReceptionist ? (<ReceptionistRoutes />) : (<AppRoutes />))}
    </NavigationContainer>
  );
};

export default Routes;
