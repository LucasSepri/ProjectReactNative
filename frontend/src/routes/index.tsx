import React, { useContext } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { COLORS } from "../styles/COLORS";

import AppRoutes from "./app.routes";
import AdminRoutes from "./admin.routes"; // Certifique-se de que este componente existe

import { AuthContext } from "../context/AuthContext";

function Routes() {

    const { isAuthenticated, loading, user } = useContext(AuthContext);

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.dark,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <ActivityIndicator size={60} color={COLORS.white} />
            </View>
        );
    }

    /* if (!isAuthenticated) {
        return <AppRoutes />;
    } else {
        if (user.isAdmin == true) {
            return <AdminRoutes />;
        } else {
            return <AppRoutes />;
        }
    } */
    if (!isAuthenticated) {
        return <AppRoutes />;
    }

    return user.isAdmin ? <AdminRoutes /> : <AppRoutes />;



}

export default Routes;
