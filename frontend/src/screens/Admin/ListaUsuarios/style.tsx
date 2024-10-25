import { StyleSheet } from 'react-native';
import { COLORS } from '../../../styles/COLORS';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.white,
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 8,
        elevation: 3,
        paddingHorizontal: 12,
        width: '80%',
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
        backgroundColor: COLORS.white,
        borderRadius: 8,
        elevation: 2,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
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
        fontSize: 16,
        color: COLORS.darkGrey,
    },
    deleteButton: {
        backgroundColor: COLORS.red,
        padding: 10,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    addAdminButton: {
        backgroundColor: COLORS.blue,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 10,
    },
    removeAdminButton: {
        backgroundColor: COLORS.green,
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    userRoleButtonText: {
        color: COLORS.white,
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
        backgroundColor: COLORS.white,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    refreshIcon: {
        fontSize: 24,
        color: COLORS.darkGrey,
    },
});

export default styles;