import {SafeAreaView, StatusBar } from "react-native";


import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";

// Importando o contextos
import { AuthProvider } from "./src/context/AuthContext";
import { TableProvider } from './src/context/TableContext';
import { FoodsProvider } from './src/context/FoodsContext';

import { COLORS } from "./src/styles/COLORS";

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black}}>
            <NavigationContainer>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
                <AuthProvider>
                    <TableProvider>
                        <FoodsProvider>
                            <Routes />
                        </FoodsProvider>
                    </TableProvider>
                </AuthProvider>
            </NavigationContainer>
        </SafeAreaView>
    );
}