import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.text,
  },
  zipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  zipInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: COLORS.white,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: COLORS.text,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: COLORS.white,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfContainer: {
    flex: 1,
    marginRight: 10,
  },
  switch: {
    alignSelf: 'center',
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: 18,
  },
  disabledButton: {
    backgroundColor: COLORS.border,
  },
});

export default styles;