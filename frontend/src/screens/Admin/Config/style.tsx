import { StyleSheet } from 'react-native';
import { HueCircular } from 'reanimated-color-picker';

const styles = (theme) => StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.text,
        marginBottom: 20,
        textAlign: 'center',
    },
    imageSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        gap: 16,
    },
    imageContainer: {
        alignItems: 'center',
    },
    imageContainerB: {
        flex: 1,
        alignItems: 'center',
    },
    imageWrapper: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    imageWrapperB: {
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    imagePreviewLogo: {
        width: 120,
        height: 120,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePreview: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.textPrimary,
    },
    cardContainer: {
        padding: 20,
        backgroundColor: theme.background,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 5,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
        paddingBottom: 5,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: theme.text,
        padding: 8,
        borderRadius: 5,
        backgroundColor: theme.inputBackground,
    },
    addressContainer:{
        marginTop: 20,
        flexDirection: 'row',
        gap: 10,

    },
    button: {
        backgroundColor: theme.primary,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    deleteAddress: {
        backgroundColor: theme.danger,
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        // textAlign: 'center',
        // alignContent: 'center',
        alignSelf: 'center',

    },
    addressText: {
        color: theme.white,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    buttonContainerColor: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    colorButtonPrimary: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorButtonSecondary: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButtonColors: {
        color: '#fff',
        fontWeight: 'bold',
    },
    containerColorPicker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    colorPicker: {
        padding: 10,
        alignSelf: 'center',
        flex: 1,
    },
    hueContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    panelStyle: {
        width: '70%',
        height: '70%',
        alignSelf: 'center',
        borderRadius: 16,
    },
    swatchesContainer: {
        padding: 10,
        flex: 0.7,
    },
    swatchStyle: {
        width: 35,
        height: 35,
        borderRadius: 5,
        // marginBottom: 10,
    },

    // Estilos para o Seção de seleção de horário
    timeRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    timeLabel: {
        fontSize: 16,
        fontWeight: '400',
        flex: 1,
    },
    timePickerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeButton: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: theme.secondary,
        borderRadius: 6,
    },
    timeButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: theme.white,
    },
    timeSeparator: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 3,
    },
    // Botões de ação
    submitButton: {
        backgroundColor: theme.primary,
        padding: 15,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: theme.danger,
        padding: 15,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

});

export default styles;
