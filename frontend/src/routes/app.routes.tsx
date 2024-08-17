import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import FinishOrder from "../screens/FinishOrder";
import Perfil from "../screens/Perfil";
import SignIn from "../screens/SignIn";
import Qrcode from "../screens/Qrcode";
import SignUp from "../screens/SignUp";
import EditarPerfil from "../screens/EditarPerfil";
import Home from "../screens/Home";

import TabRouter from "./tab.routes";

// Definindo os tipos de rotas
export type StackParamList = {
    TabRouter: undefined;
    Home: undefined;
    Perfil: undefined;
    FinishOrder: {
        number: number | string,
        order_id: string;
    };
    Qrcode: undefined;
    SignIn: undefined;
    SignUp: undefined;
    EditarPerfil: undefined;
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
                name="Perfil"
                component={Perfil}
                options={{
                    headerShown: true,
                    title: "Seus Dados",
                    headerStyle: {
                        backgroundColor: '#1d1d2e',
                    },
                    headerTintColor: '#FFF',
                }}
            />

            <Stack.Screen
                name="FinishOrder"
                component={FinishOrder}
                options={{
                    title: "finalizando",
                    headerStyle: {
                        backgroundColor: '#1d1d2e',
                    },
                    headerTintColor: '#FFF',
                }}
            />
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                    title: "Logar-se",
                    headerStyle: {
                        backgroundColor: '#1d1d2e',
                    },
                    headerTintColor: '#FFF',
                }}
            />
            <Stack.Screen name="Qrcode" component={Qrcode} options={{
                headerStyle: {
                    backgroundColor: '#1d1d2e',
                },
                headerTintColor: '#FFF',
            }} />

            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    title: "cadastrar-se",
                    headerStyle: {
                        backgroundColor: '#1d1d2e',
                    },
                    headerTintColor: '#FFF',
                }} />
            <Stack.Screen
                name="EditarPerfil"
                component={EditarPerfil}
                options={{
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