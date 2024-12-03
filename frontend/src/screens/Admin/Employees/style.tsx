import { StyleSheet } from 'react-native';

const styles = (theme: { [key: string]: string }) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.white,
    },
    header:{
        borderColor: theme.primary,
        borderWidth: 2,
        borderRadius: 10,
        padding: 20,
        margin: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.white,
        borderRadius: 8,
        elevation: 3,
        paddingHorizontal: 12,
        borderColor: theme.primary,
        borderWidth: 1,
        marginBottom: 20,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    addButton: {
        backgroundColor: theme.primary,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: theme.white,
        fontWeight: 'bold',
    },
    errorContainer:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
    },
    retryButton:{
        fontSize: 16,
        color: theme.danger,
        fontWeight: 'bold',
    },
    
    employeeContainer: {
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 20,
        backgroundColor: theme.white,
        borderRadius: 8,
        elevation: 2,
    },
    employeeInfoContainer: {
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 15,
    },
    employeeInfo: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 14,
        color: theme.text,
    },
    telefone: {
        fontSize: 14,
        color: theme.text,
    },
    deleteButton: {
        backgroundColor: theme.danger,
        padding: 10,
        borderRadius: 8,
        alignSelf: 'center',
    },
    addAdminButton: {
        backgroundColor: theme.success,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        flex: 1,
    },
    removeAdminButton: {
        backgroundColor: theme.secondary,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        flex: 1,
    },
    userRoleButtonText: {
        color: theme.white,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    roleButtonContainer: {
        marginTop: 10,
        gap: 10,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    searchContainerRefresh: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // padding: 10,
        marginBottom: 20,
    },
    refreshList: {
        padding: 10,
        borderRadius: 25,
        backgroundColor: theme.white,
        shadowColor: theme.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    refreshIcon: {
        fontSize: 24,
        color: theme.primary,
    },
    reflectionContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.primary,
        padding: 10,
        alignItems: 'center',
    },
    reflectionText: {
        color: theme.white,
        fontWeight: 'bold',
    }
});

export default styles;