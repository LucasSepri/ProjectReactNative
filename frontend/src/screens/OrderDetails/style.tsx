import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';

export default StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.white,
        padding: 20,
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        color: COLORS.primary,
        marginBottom: 20,
    },
    section: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.secondary,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.white,
        paddingBottom: 5,
    },
    orderText: {
        fontSize: 16,
        marginBottom: 8,
        color: COLORS.black,
    },
    label: {
        fontWeight: 'bold',
        color: COLORS.text,
    },
    itemContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    itemText: {
        fontSize: 16,
        color: COLORS.text,
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: COLORS.white,
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
