import { StyleSheet } from 'react-native';

const styles = (theme: { primary: string; secondary: string; border: string; background: string; text: string; white: string; danger: string; }) => StyleSheet.create({
    scrollView: {
        padding: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.primary,
        marginBottom: 12,
    },

    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 8,
        backgroundColor: theme.background,
        marginBottom: 14,
        elevation: 1, // Sombra leve para os campos de entrada
    },
    icon: {
        paddingHorizontal: 10,
    },
    input2: {
        flex: 1,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 16,
        color: theme.text,
    },

    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 8,
        padding: 10,
        marginHorizontal: 8,
        backgroundColor: theme.background,
        color: theme.text,
        textAlign: 'center',
    },
    imagePicker: {
        borderWidth: 1,
        borderColor: theme.primary,
        borderStyle: 'dashed',
        borderRadius: 8,
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: theme.white,
    },
    imagePlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column', // Coloca o ícone e o texto em coluna
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 8,
    },
    defaultProfileIcon: {
        width: 120, // Defina um tamanho explícito para o ícone
        height: 120,
    },
    imageText: {
        color: theme.white,
        fontSize: 12,
        backgroundColor: theme.primary,
        paddingVertical: 4,
        borderRadius: 4,
        textAlign: 'center',
        width: '100%',
        flex: 1,
    },

    cardContainer: {
        backgroundColor: theme.background,
        width: '100%',
        marginVertical: 10,
        flex: 1,
        padding: 16,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    inputField: {
        backgroundColor: theme.background,
        borderColor: theme.border,
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: theme.secondary,
        flex: 1,
        marginHorizontal: 4,
    },

    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    timeLabel: {
        flex: 1,
        fontSize: 16,
        color: theme.secondary,
    },

    folgaText: {
        fontSize: 16,
        color: theme.danger,
        fontStyle: 'italic',
        marginLeft: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    buttonSubmit: {
        backgroundColor: theme.primary,
        flex: 1,
        padding: 12,
        marginBottom: 20,
        borderRadius: 10,
    },
    buttonDelete: {
        backgroundColor: theme.danger,
        flex: 1,
        padding: 12,
        marginBottom: 20,
        borderRadius: 10,
    },
    textButton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default styles;