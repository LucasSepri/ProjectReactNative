import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';

const styles = StyleSheet.create({
  screenContainer: {
      flex: 1,
      // backgroundColor: COLORS.background,
  },
  loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  profileSection: {
      backgroundColor: COLORS.white,
      elevation: 2,
      padding: 16,
  },
  headerSection: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  actionSection: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 20,
  },
  profileImage: {
      width: 150,
      height: 150,
      borderRadius: 10,
      marginRight: 16,
  },
  userInfo: {
      flex: 1,
  },
  userName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.black,
      marginBottom: 4,
  },
  userPhone: {
      fontSize: 16,
      color: COLORS.grey,
  },
  userEmail: {
      fontSize: 16,
      color: COLORS.grey,
  },
  buttonContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
  },
  button: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      borderRadius: 8,
  },
  logoutButton: {
      backgroundColor: COLORS.primary,
      marginTop: 10,
      justifyContent: 'center',
      alignSelf: 'center',
      padding: 10,
      borderRadius: 8,
      width: '100%',
      flexDirection: 'row',
  },
  buttonText: {
      color: COLORS.white,
      fontSize: 16,
      marginLeft: 8,
  },
  editButton: {
      backgroundColor: COLORS.blue,
      marginRight: 10,
      padding: 8,
      borderRadius: 8,
  },
  deleteButton: {
      backgroundColor: COLORS.red,
      padding: 8,
      borderRadius: 8,
  },
  divider:{
      // backgroundColor: COLORS.white,
      // marginHorizontal: 16,
      // paddingHorizontal: 16,
      width: '100%',
      height: '100%',
      borderRadius: 10,
  },
  addressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: COLORS.secondary,
      padding: 16,
      marginBottom: 10,
      elevation: 2,
    },
    addressHeaderText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: COLORS.white,
    },
    addressItemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 10,
      backgroundColor: COLORS.white,
      marginBottom: 10,
      elevation: 1,
  },
  addressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  addressInfo: {
      marginLeft: 10,
  },
  addressText: {
      fontSize: 16,
      color: COLORS.primary,
  },
  addressSubtext: {
      fontSize: 14,
      color: COLORS.secondary,
  },
  addButton: {
      backgroundColor: COLORS.white,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
  },
  addButtonText: {
      color: COLORS.secondary,
      fontSize: 16,
  },
  addressListContainer: {
      paddingVertical: 10,
      paddingHorizontal: 16,
  },
  emptyAddressContainer: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40,
  },
  emptyAddressTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.primary,
  },
  emptyAddressText: {
      fontSize: 14,
      color: COLORS.secondary,
      textAlign: 'center',
      marginTop: 8,
  },
});

export default styles;
