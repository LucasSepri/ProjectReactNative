import React from "react";

import { View, ActivityIndicator } from 'react-native';

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import COLORS from "../styles/COLORS";

function Routes() {
  const isAuthenticated = true;
  const loading = false;

  if (loading) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: COLORS.dark,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <ActivityIndicator size={60} color={COLORS.white} />
      </View>
    );
  } else {
    return (
      isAuthenticated ? <AppRoutes /> : <AuthRoutes />
    );
  }
}

export default Routes;