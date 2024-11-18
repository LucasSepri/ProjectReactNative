import { StyleSheet } from 'react-native';

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: theme.white,
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

    userContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: theme.white,
        borderRadius: 8,
        elevation: 2,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 15,
    },
    userInfo: {
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
    telefone:{
        fontSize: 14,
        color: theme.text,
    },
    deleteButton: {
        backgroundColor: theme.danger,
        padding: 10,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    addAdminButton: {
        backgroundColor: theme.success,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 10,
    },
    removeAdminButton: {
        backgroundColor: theme.secondary,
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    userRoleButtonText: {
        color: theme.white,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    roleButtonContainer: {
        marginTop: 10,
        flex: 1,
        alignItems: 'center',
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
    reflectionContainer:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.primary,
        padding: 10,
        alignItems: 'center',
    },
    reflectionText:{
        color: theme.white,
        fontWeight: 'bold',
    }
});

export default styles;