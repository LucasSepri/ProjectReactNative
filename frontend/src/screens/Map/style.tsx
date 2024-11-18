import { StyleSheet } from 'react-native';

const styles = (theme) => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      paddingVertical: 20,
      backgroundColor: theme.white,
      alignItems: 'center',
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.black,
    },
    addressText: {
      fontSize: 16,
      color: theme.text,
      textAlign: 'center',
    },
    webView: {
      flex: 1,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
      backgroundColor: theme.background,
    },
    button: {
      flex: 1,
      marginHorizontal: 5,
      paddingVertical: 10,
      backgroundColor: theme.primary,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: theme.white,
      fontWeight: 'bold',
    },
  });
  
  export default styles;