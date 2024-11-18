import { api } from '../../services/api';
import dark from './dark';
import light from './light';

// Função que retorna o tema da API
export const getThemeFromApi = async (themeType: 'dark' | 'light') => {
    try {
        const response = await api.get('/store-settings');
        const { colors: colorsFromApi } = response.data;

        if (colorsFromApi && typeof colorsFromApi === 'string') {
            const parsedColors = JSON.parse(colorsFromApi);

            if (parsedColors?.background?.primary && parsedColors?.background?.secondary) {
                return {
                    primary: parsedColors.background.primary,
                    secondary: parsedColors.background.secondary,
                    // color: themeType === 'dark' ? dark.color : light.color,
                    color: '#FFFF',   // Tom de marrom mais suave, dando um toque acolhedor e natural
                    success: "#0cb01c",       // Verde mais suave, representando frescor e qualidade
                    danger: "#E74C3C",        // Vermelho mais suave e moderno, para causar menos tensão
                    text: "#2C3E50",           // Mantém o fundo neutro e claro
                    border: "#BDC3C7",        // Tom de cinza claro, mais suave que o cinza original
                    background: "#FAFAFA",    // Mantém o fundo neutro e claro


                    white: "#FFFFFF",         // Mantém o branco para equilíbrio e clareza
                    black: "#000000",
                };
            } else {
                console.warn('Cores da API estão incompletas. Usando valores padrão.');
            }
        }

        return themeType === 'dark' ? dark : light; // Valores padrão
    } catch (error) {
        return themeType === 'dark' ? dark : light; // Valores padrão
    }
};

// Exportando a função e os temas
export default { dark, light, getThemeFromApi };