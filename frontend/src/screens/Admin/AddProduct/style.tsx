import { StyleSheet } from "react-native";

const styles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.white,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    padding: 20,
    backgroundColor: theme.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: theme.text,
  },
  pickerContainer: {
    backgroundColor: theme.white,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.border,
  },
  picker: {
    height: 50,
    borderRadius: 8,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 10,
    height: 200,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: theme.black,
    alignSelf: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 8,
    width: 200,
    height: 200,
    backgroundColor: theme.white,
  },
  defaultProfileIcon:{
    width: 100,
    height: 100,
  },
  imageText: {
    color: theme.white,
    fontSize: 16,
    backgroundColor: theme.primary,
    paddingVertical: 4,
    borderRadius: 4,
    textAlign: 'center',
    width: '100%',
  },
  input: {
    padding: 10,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: theme.white,
  },
  inpultContainer: {
    marginBottom: 10,
    borderColor: theme.border,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  inputDescription: {
    backgroundColor: theme.white,
    color: theme.text,
  },
  charCountText: {
    color: theme.danger,
    fontSize: 12,
    textAlign: 'right',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    elevation: 2,
  },
  submitButton: {
    backgroundColor: theme.primary,
  },
  cancelButton: {
    backgroundColor: theme.danger,
  },
  buttonText: {
    color: theme.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;