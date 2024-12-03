import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import Routes from './src/routes';
import { ThemeProvider } from 'styled-components';
import socket from './src/services/socket';
import { api } from './src/services/api';
import themes from './src/styles/theme';
import { TableProvider } from './src/context/TableContext';
import { AuthProvider } from './src/context/AuthContext';
import { AddressProvider } from './src/context/AddressContext';

const App: React.FC = () => {
  const userColorScheme = useColorScheme();
  const [theme, setTheme] = useState(themes[userColorScheme ?? 'dark'] || themes.dark);

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
        setTheme(themes[userColorScheme ?? 'dark']); // Em caso de erro, usamos o tema padrão
      }
    };

    loadTheme(); // Chama para carregar o tema inicialmente
    socket.on('lojaAtualizada', () => {
      loadTheme();
    });


    // Limpeza do evento quando o componente for desmontado
    return () => {
      socket.off('lojaAtualizada'); // Corrigido para remover o ouvinte correto
    };
  }, [userColorScheme]); // Dependência de mudança de esquema de cor do usuário

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar
        backgroundColor={theme.primary} // Define a cor de fundo da barra de status
        barStyle="light-content" // Define o conteúdo (ícones e texto) em branco
        showHideTransition="fade"
      />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <TableProvider>
            <AddressProvider>
              <Routes />
            </AddressProvider>
          </TableProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaView>
  );
};

export default App;
