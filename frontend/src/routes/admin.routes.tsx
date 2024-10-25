import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import EditarPerfil from "../screens/EditarPerfil";
import AdminRoutes from "./drawer.routes";
import { COLORS } from "../styles/COLORS";

// Definindo os tipos de rotas
export type StackParamList = {
    EditarPerfil: undefined;
    AdminRoutes: undefined;
}

const Stack = createStackNavigator<StackParamList>();

function AppRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AdminRoutes"
                component={AdminRoutes}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditarPerfil"
                component={EditarPerfil}
                options={{
                    headerShown: true,
                    title: "Editar Perfil",
                    headerStyle: {
                        backgroundColor: COLORS.dark,
                    },
                    headerTintColor: COLORS.white,
                }}
            />

        </Stack.Navigator>
    );
}

export default AppRoutes;