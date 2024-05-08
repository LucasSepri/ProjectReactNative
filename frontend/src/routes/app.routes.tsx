import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import Dashboard from "../screens/Dashboard";
import Order from "../screens/Order";
import FinishOrder from "../screens/FinishOrder";
import Perfil from "../screens/Perfil";
import SignIn from "../screens/SignIn";
import Qrcode from "../screens/Qrcode";
import SignUp from "../screens/SignUp";

// Definindo os tipos de rotas
export type StackParamList = {
    Dashboard: undefined;
    Perfil: undefined;
    Order: {
        number: number | string;
        order_id: string;
    };
    FinishOrder: {
        number: number | string,
        order_id: string;
    };
    Qrcode: undefined;
    SignIn: undefined;
    SignUp: undefined;

}

const Stack = createStackNavigator<StackParamList>();

function AppRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
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
                name="Order"
                component={Order}
                options={{ headerShown: false }}
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
        </Stack.Navigator>
    );
}

export default AppRoutes;