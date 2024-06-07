import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import EditarPerfil from "../screens/EditarPerfil";
import AdminRoutes from "./drawer.routes";

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
                        backgroundColor: '#1d1d2e',
                    },
                    headerTintColor: '#FFF',
                }}
            />

        </Stack.Navigator>
    );
}

export default AppRoutes;