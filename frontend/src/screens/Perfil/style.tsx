import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      profileContainer: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 40,
      },
      profileImage: {
        width: 250,
        height: 250,
        borderRadius: 160,
        marginBottom: 20,
        backgroundColor: '#bababa',
      },
      name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
      },
      email: {
        fontSize: 18,
        marginBottom: 5,
        color: '#666',
      },
      phone: {
        fontSize: 18,
        marginBottom: 5,
        color: '#666',
      },
      address: {
        fontSize: 18,
        marginBottom: 10,
        color: '#666',
      },
      buttonContainer: {
        paddingHorizontal: 20,
      },
      button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 8,
        marginBottom: 15,
      },
      buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
      },
      editButton: {
        backgroundColor: '#007bff',
      },
      dangerButton: {
        backgroundColor: '#dc3545',
      },
      logoutButton: {
        backgroundColor: '#6c757d',
      },
      editText: {
        color: '#fff',
      },
      dangerText: {
        color: '#fff',
      },
      logoutText: {
        color: '#fff',
      },
});
