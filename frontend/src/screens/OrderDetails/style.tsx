import { StyleSheet } from 'react-native';

const styles = (theme) => StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: theme.white,
        padding: 20,
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        color: theme.primary,
        marginBottom: 20,
    },
    section: {
        backgroundColor: theme.white,
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: theme.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.secondary,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.white,
        paddingBottom: 5,
    },
    orderText: {
        fontSize: 16,
        marginBottom: 8,
        color: theme.black,
    },
    label: {
        fontWeight: 'bold',
        color: theme.text,
    },
    itemContainer: {
        backgroundColor: theme.white,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    itemText: {
        fontSize: 16,
        color: theme.text,
    },
    button: {
        backgroundColor: theme.primary,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: theme.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});
export default styles;
