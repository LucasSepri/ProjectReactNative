import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Perfil from "../screens/Profile";
import SignIn from "../screens/SignIn";
import Pesquisa from "../screens/Search";
import SignUp from "../screens/SignUp";
import EditarPerfil from "../screens/EditarPerfil";
import { Home } from "../screens/Home";
import OrderDetails from "../screens/OrderDetails";
import ProductDetails from "../screens/ProductDetails";
import MapScreen from "../screens/Map";
import Endereco from "../screens/Address";


import Inicio from "./tab.routes";
import Qrcode from "../screens/Qrcode";

import { useTheme } from "styled-components";

// Definindo os tipos de rotas
export type StackParamList = {
    OrderDetails: undefined;
    Perfil: undefined;
    Pesquisa: undefined;
    SignIn: undefined;
    SignUp: undefined;
    EditarPerfil: undefined;
    ProductDetails: { product: any, category: any };
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
        addForUser: boolean;
        returnScreen: string;
    };
    Endereco: { 
        addForUser: boolean,
        returnScreen: string
     };
    Qrcode: undefined;
    MapScreen2: undefined;
    Inicio: { 
        screen: string;
    };
    Home: undefined;
}

const Stack = createStackNavigator<StackParamList>();

function AppRoutes() {
    const theme = useTheme();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Inicio"
                component={Inicio}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                    title: "Mapa",
                    headerStyle: {
                        backgroundColor: theme.primary,
                    },
                    headerTintColor: theme.white,
                }} />

            <Stack.Screen
                name="Qrcode"
                component={Qrcode}
                options={{
                    title: "Qrcode",
                    headerStyle: {
                        backgroundColor: theme.primary,
                    },
                    headerTintColor: theme.white,
                }} />

            <Stack.Screen
                name="Endereco"
                component={Endereco}
                options={{
                    title: "Endereco",
                    headerStyle: {
                        backgroundColor: theme.primary,
                    },
                    headerTintColor: theme.white,
                }} />
            <Stack.Screen
                name="OrderDetails"
                component={OrderDetails}
                options={{
                    title: "Detalhes do Pedido",
                    headerStyle: {
                        backgroundColor: theme.primary,
                    },
                    headerTintColor: theme.white,
                }}
            />
            <Stack.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    headerShown: true,
                    title: "Seus Dados",
                    headerStyle: {
                        backgroundColor: theme.primary,
                    },
                    headerTintColor: theme.white,
                }}
            />
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                    title: "Logar-se",
                    headerStyle: {
                        backgroundColor: theme.primary,
                    },
                    headerTintColor: theme.white,
                }}
            />
            <Stack.Screen name="Pesquisa"
                component={Pesquisa}
                options={{
                    headerShown: true,
                    title: "Pesquisar Produto",
                    headerStyle: {
                        backgroundColor: theme.primary,
                    },
                    headerTintColor: theme.white,
                }} />

            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    title: "cadastrar-se",
                    headerStyle: {
                        backgroundColor: theme.primary,
                    },
                    headerTintColor: theme.white,
                }} />
            <Stack.Screen
                name="EditarPerfil"
                component={EditarPerfil}
                options={{
                    title: "Editar Perfil",
                    headerStyle: {
                        backgroundColor: theme.primary,
                    },
                    headerTintColor: theme.white,
                }}
            />
            <Stack.Screen
                name="ProductDetails"
                component={ProductDetails}
                options={{
                    headerShown: false,
                    title: "Detalhes do Produto",
                    headerStyle: {
                        backgroundColor: theme.black,
                    },
                    headerTintColor: theme.white,
                }}
            />

        </Stack.Navigator>
    );
}

export default AppRoutes;