import { StyleSheet } from 'react-native';

const styles = (theme: any) => StyleSheet.create({
    headerImage: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.primary,
    },
    headerIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
    },
    profileButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.white,
        marginLeft: 10,
    },
    EntrarButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.white,
    },
    tableExitButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tableExitText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.white,
    },
    exitIcon: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.white,
        marginLeft: 10,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 10,
        borderRadius: 10,
        // borderColor: theme.white,
        // borderWidth: 2,
        elevation: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.white,
        marginBottom: 10,
        // elevation: 2,
        textAlign: 'center',
    },
    buttonContainer: {
        // backgroundColor: theme.primary,
        width: '100%',
        paddingHorizontal: 20,

        flexDirection: 'column',
        marginVertical: 10,
        // marginHorizontal: 20,
        gap: 10,
    },
    buttonSeparator: {
        flexDirection: 'row',
        gap: 10,
    },
    whatsAppButton: {
        flexDirection: 'row',
        backgroundColor: theme.success,
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
    },
    hoursButton: {
        flexDirection: 'row',
        backgroundColor: theme.secondary,
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
    },
    locationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.primary,
        padding: 10,
        borderRadius: 5,
        // flex: 1,
        // marginHorizontal: 5,
        marginBottom: 10,
        // alignSelf: 'center',
        flex: 1
    },
    buttonText: {
        color: theme.white,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        flexGrow: 1,
    },





    // MODAL
    overlay: {
        flex: 1,
        backgroundColor: `rgba(${parseInt(theme.black.slice(1, 3), 16)}, ${parseInt(theme.black.slice(3, 5), 16)}, ${parseInt(theme.black.slice(5, 7), 16)}, 0.5)`,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: theme.background,
        borderRadius: 12,
        width: '80%',
        padding: 20,
        alignItems: 'center',
        elevation: 5, // Sombra para Android
        shadowColor: theme.black, // Sombra para iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    header: {
        width: '100%',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.primary, // Cor da borda decorativa
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: theme.text,
    },
    hoursContainer: {
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
    },
    hourText: {
        fontSize: 16,
        color: theme.text,
        marginVertical: 5,
    },
    closeButton: {
        marginTop: 15,
        backgroundColor: theme.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default styles;