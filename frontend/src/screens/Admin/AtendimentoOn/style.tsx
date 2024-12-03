import { StyleSheet } from "react-native";
const styles = (theme: { [key: string]: string }) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f7f7f7',
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

    noChatsContainer:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    noChatsText: {
        fontSize: 16,
        color: theme.primary,
        fontWeight: 'bold',
    },

    list: {
        paddingBottom: 20,
    },
    chatItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        gap: 10,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    chatInfo: {
        flex: 1,
        marginLeft: 15,
    },
    chatText: {
        fontSize: 16,
        color: '#555',
    },
    unreadCount: {
        fontSize: 14,
        color: theme.danger, // Cor para destacar as mensagens novas
        marginTop: 5,
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 10,
    },
    deleteButton: {
        backgroundColor: theme.danger,
        padding: 10,
        borderRadius: 8,
        alignSelf: 'center',
    },
    deleteText: {
        color: '#fff',
        fontSize: 14,
    },
});


export default styles;