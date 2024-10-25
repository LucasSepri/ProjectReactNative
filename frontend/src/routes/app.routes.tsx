import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS } from "../styles/COLORS";

import Perfil from "../screens/Perfil";
import SignIn from "../screens/SignIn";
import Pesquisa from "../screens/Pesquisa";
import SignUp from "../screens/SignUp";
import EditarPerfil from "../screens/EditarPerfil";
import Home from "../screens/Home";
import OrderDetails from "../screens/OrderDetails";
import ProductDetails from "../screens/ProductDetails";

import TabRouter from "./tab.routes";

// Definindo os tipos de rotas
export type StackParamList = {
    TabRouter: undefined;
    Home: undefined;
    OrderDetails: undefined;
    Perfil: undefined;
    Pesquisa: undefined;
    SignIn: undefined;
    SignUp: undefined;
    EditarPerfil: undefined;
    ProductDetails: { product: any, category: any };
}

const Stack = createStackNavigator<StackParamList>();

function AppRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="TabRouter"
                component={TabRouter}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="OrderDetails"
                component={OrderDetails}
                options={{
                    title: "Detalhes do Pedido",
                    headerStyle: {
                        backgroundColor: COLORS.dark,
                    },
                    headerTintColor: COLORS.white,
                }}
            />
            <Stack.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    headerShown: true,
                    title: "Seus Dados",
                    headerStyle: {
                        backgroundColor: COLORS.dark,
                    },
                    headerTintColor: COLORS.white,
                }}
            />
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                    title: "Logar-se",
                    headerStyle: {
                        backgroundColor: COLORS.dark,
                    },
                    headerTintColor: COLORS.white,
                }}
            />
            <Stack.Screen name="Pesquisa"
                component={Pesquisa}
                options={{
                    headerShown: true,
                    title: "Pesquisar Produto",
                    headerStyle: {
                        backgroundColor: COLORS.dark,
                    },
                    headerTintColor: COLORS.white,
                }} />

            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    title: "cadastrar-se",
                    headerStyle: {
                        backgroundColor: COLORS.dark,
                    },
                    headerTintColor: COLORS.white,
                }} />
            <Stack.Screen
                name="EditarPerfil"
                component={EditarPerfil}
                options={{
                    title: "Editar Perfil",
                    headerStyle: {
                        backgroundColor: COLORS.dark,
                    },
                    headerTintColor: COLORS.white,
                }}
            />
            <Stack.Screen
                name="ProductDetails"
                component={ProductDetails}
                options={{
                    headerShown: false,
                    title: "Detalhes do Produto",
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