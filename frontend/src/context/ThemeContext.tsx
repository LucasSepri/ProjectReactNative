import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { getThemeFromApi } from '../styles/theme/GetTheme';
import dark from '../styles/theme/dark';
import light from '../styles/theme/light';

const ThemeContext = createContext({
    theme: dark,
    setTheme: (theme: typeof dark | typeof light) => {}
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(dark); // Estado inicial pode ser 'dark' ou 'light'

    useEffect(() => {
        const loadTheme = async () => {
            // Verificar o tema atual corretamente e carregar a função com base nisso
            const themeFromApi = await getThemeFromApi(theme === dark ? 'dark' : 'light');
            setTheme(themeFromApi);
        };

        loadTheme(); // Carrega o tema ao iniciar

    }, [theme]); // Carrega o tema sempre que o valor de 'theme' mudar

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
