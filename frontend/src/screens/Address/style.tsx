import { StyleSheet } from 'react-native';

const styles = (theme) => StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: theme.background,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.text,
  },
  zipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  zipInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: theme.white,
  },
  searchButton: {
    backgroundColor: theme.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: theme.text,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: theme.white,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfContainer: {
    flex: 1,
  },
  halfContainerNo:{
    marginRight: 10,
  },
  switch: {
    alignSelf: 'center',
  },
  confirmButton: {
    backgroundColor: theme.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: theme.white,
    fontSize: 18,
  },
  disabledButton: {
    backgroundColor: theme.border,
  },
});

export default styles;