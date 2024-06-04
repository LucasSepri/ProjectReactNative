import React, { useContext } from "react";
import { View, ActivityIndicator, Text } from "react-native";

import AppRoutes from "./app.routes";
import AdminRoutes from "./admin.routes"; // Certifique-se de que este componente existe
import AuthRoutes from "./auth.routes";

import { AuthContext } from "../context/AuthContext";

function Routes() {

    const { isAuthenticated, loading, user } = useContext(AuthContext);

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#1D1D2E",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <ActivityIndicator size={60} color="#f5f7fb" />
            </View>
        );
    }

    if (!isAuthenticated) {
        return <AppRoutes />;
    } else {
        if (user.isAdmin == true) {
            return <AdminRoutes />;
        } else {
            return <AppRoutes />;
        }
    }

    
}

export default Routes;
