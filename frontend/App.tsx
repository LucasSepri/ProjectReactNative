import { StatusBar } from "react-native";


import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";

import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor="#1d1d2e"/>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </NavigationContainer>
    );
}