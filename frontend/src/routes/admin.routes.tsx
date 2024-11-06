import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS } from "../styles/COLORS";


import EditarPerfil from "../screens/EditarPerfil";
import AdminRoutes from "./drawer.routes";
import MapScreen from "../screens/Map";
import Endereco from "../screens/Address";
import QrcodeGerneretor from "../screens/Admin/QrcodeGeneretor";
import Config from "../screens/Admin/Config";


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
    QrcodeGerneretor: undefined;
    Config: undefined;
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
                        backgroundColor: COLORS.background,
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
            <Stack.Screen
                name="QrcodeGerneretor"
                component={QrcodeGerneretor}
                options={{
                    title: "Gerador de QrCode",
                    headerStyle: {
                        backgroundColor: COLORS.primary,
                    },
                    headerTintColor: COLORS.white,
                }} />
            <Stack.Screen
                name="Config"
                component={Config}
                options={{
                    title: "Configurações",
                    headerStyle: {
                        backgroundColor: COLORS.primary,
                    },
                    headerTintColor: COLORS.white,
                }} />

        </Stack.Navigator>
    );
}

export default AppRoutes;