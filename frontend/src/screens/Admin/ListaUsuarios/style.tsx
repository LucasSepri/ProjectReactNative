import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f0f0f0',
  },
  searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 8,
      paddingLeft: 8,
      flex: 1,
      height: 50,
      marginLeft: 10,
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
      backgroundColor: '#fff',
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
      color: '#555',
  },
  deleteButton: {
      backgroundColor: '#ff5252',
      padding: 10,
      borderRadius: 8,
      alignSelf: 'flex-start',
      marginBottom: 10,
  },
  addAdminButton: {
      backgroundColor: '#007bff',
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 40,
      paddingVertical: 10,
  },
  removeAdminButton: {
      backgroundColor: '#ff8c00',
      paddingHorizontal: 40,
      paddingVertical: 10,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
  },
  userRoleButtonText: {
      color: '#fff',
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
      padding: 10,
      backgroundColor: '#f2f2f2',
      marginBottom: 20,
  },
  refreshList: {
      padding: 10,
      borderRadius: 25,
      backgroundColor: '#e0e0e0',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  },
  refreshIcon: {
      fontSize: 24,
      color: '#606060',
  },
});

export default styles;