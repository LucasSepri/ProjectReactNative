import { StyleSheet } from 'react-native';

const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.white,
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: theme.primary,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 14,
    color: theme.text,
    marginBottom: 30,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: theme.primary,
    borderStyle: 'dashed',
    borderRadius: 8,
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: theme.white,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column', // Coloca o ícone e o texto em coluna
  },
  imageText: {
    color: theme.white,
    fontSize: 12,
    backgroundColor: theme.primary,
    paddingVertical: 4,
    borderRadius: 4,
    textAlign: 'center',
    width: '100%',
    flex: 1,
  },
  defaultProfileIcon: {
    width: 120, // Defina um tamanho explícito para o ícone
    height: 120,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: theme.background,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
    color: theme.text,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: theme.border,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: theme.white,
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default styles;
