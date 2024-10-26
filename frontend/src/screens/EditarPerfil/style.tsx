import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 14,
    color: COLORS.darkGrey,
    marginBottom: 30,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    borderRadius: 5,
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  uploadText: {
    color: COLORS.primary,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: COLORS.lightGrey,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
    color: COLORS.dark,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.grey,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default styles;
