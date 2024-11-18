import { useState, useEffect } from "react";
import { SafeAreaView, StatusBar, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import { Splash } from "./src/components/Splash";
import { preventAutoHideAsync } from "expo-splash-screen";
import { ThemeProvider } from "styled-components/native";

import { AuthProvider } from "./src/context/AuthContext";
import { TableProvider } from './src/context/TableContext';
import { AddressProvider } from './src/context/AddressContext';

import themes from './src/styles/theme';
import socket from "./src/services/socket";
import { api } from "./src/services/api";


preventAutoHideAsync();

export default function App() {
    const userColorScheme = useColorScheme();
    const [splashComplete, setSplashComplete] = useState(false);
    const [theme, setTheme] = useState(themes[userColorScheme] || themes.dark);

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const response = await api.get('/store-settings');
                const { colors: colorsFromApi } = response.data;

                if (colorsFromApi && typeof colorsFromApi === 'string') {
                    const parsedColors = JSON.parse(colorsFromApi);

                    if (parsedColors?.background?.primary && parsedColors?.background?.secondary) {
                        setTheme({
                            primary: parsedColors.background.primary,
                            secondary: parsedColors.background.secondary,
                            color: '#FFFF',   // Tom de marrom mais suave
                            success: "#0cb01c",
                            danger: "#E74C3C",
                            text: "#2C3E50",
                            border: "#BDC3C7",
                            background: "#FAFAFA",
                            white: "#FFFFFF",
                            black: "#000000",
                        });
                    } else {
                        console.warn('Cores da API estão incompletas. Usando valores padrão.');
                    }
                }
            } catch (error) {
                setTheme(themes[userColorScheme]); // Em caso de erro, usamos o tema padrão
            }
        };

        loadTheme(); // Chama para carregar o tema inicialmente

        // Limpeza do evento quando o componente for desmontado
        return () => {
            socket.off('lojaAtualizada'); // Corrigido para remover o ouvinte correto
        };
    }, [userColorScheme]); // Dependência de mudança de esquema de cor do usuário



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <ThemeProvider theme={theme}>
                <NavigationContainer>
                    <AuthProvider>
                        <TableProvider>
                            <AddressProvider>
                                <StatusBar
                                    barStyle={userColorScheme === "dark" ? "light-content" : "dark-content"}
                                    backgroundColor={userColorScheme === "dark" ? themes.dark.black : themes.dark.white}
                                />
                                {splashComplete ? (
                                    <Routes />
                                ) : (
                                    <Splash onComplete={setSplashComplete} />
                                )}
                            </AddressProvider>
                        </TableProvider>
                    </AuthProvider>
                </NavigationContainer>
            </ThemeProvider>
        </SafeAreaView>
    );
}
