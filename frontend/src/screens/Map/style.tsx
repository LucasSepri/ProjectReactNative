import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    header: {
      paddingVertical: 20,
      backgroundColor: COLORS.white,
      alignItems: 'center',
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.black,
    },
    addressText: {
      fontSize: 16,
      color: COLORS.text,
      textAlign: 'center',
    },
    webView: {
      flex: 1,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
      backgroundColor: COLORS.background,
    },
    button: {
      flex: 1,
      marginHorizontal: 5,
      paddingVertical: 10,
      backgroundColor: COLORS.primary,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: COLORS.white,
      fontWeight: 'bold',
    },
  });
  
  export default styles;