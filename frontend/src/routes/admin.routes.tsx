import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import EditarPerfil from "../screens/EditarPerfil";
import AdminRoutes from "./drawer.routes";
import MapScreen from "../screens/Mapa";
import Endereco from "../screens/Endereco";
import { COLORS } from "../styles/COLORS";

// Definindo os tipos de rotas
export type StackParamList = {
    EditarPerfil: undefined;
    AdminRoutes: undefined;
    MapScreen: {
        address: string;
        latitude: number;
        longitude: number;
        complement: string;
        referencePoint: string;
        zip: string;
        street: string;
        number: string;
        neighborhood: string;
        city: string;
        state: string;
        isVisualize: boolean;
    };
    Endereco: undefined;
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
            <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                    title: "Mapa",
                    headerStyle: {
                        backgroundColor: COLORS.primary,
                    },
                    headerTintColor: COLORS.white,
                }} />
            <Stack.Screen
                name="Endereco"
                component={Endereco}
                options={{
                    title: "Endereco",
                    headerStyle: {
                        backgroundColor: COLORS.primary,
                    },
                    headerTintColor: COLORS.white,
                }} />

        </Stack.Navigator>
    );
}

export default AppRoutes;