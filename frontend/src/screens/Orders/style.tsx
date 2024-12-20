import { StyleSheet } from 'react-native';

const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
    marginBottom: '22%',
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.white,
    backgroundColor: theme.primary,
    textTransform: 'uppercase',
  },
  filterContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: theme.background,
    borderRadius: 8,
    shadowColor: theme.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    margin: 16,
    borderColor: theme.primary,
    borderWidth: 1,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',

  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: theme.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  dateButtonText: {
    color: theme.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterButton: {
    backgroundColor: theme.secondary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterButtonText: {
    color: theme.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderCard: {
    backgroundColor: theme.white,
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: theme.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    borderBottomColor: theme.border,
    borderBottomWidth: 1,
    margin: 16,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 4,
    color: theme.text,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: theme.danger,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: theme.white,
    fontWeight: 'bold',
  },
  emptyContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage:{
    fontSize: 16,
    color: theme.primary,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  emptyInstruction:{
    fontSize: 16,
    color: theme.secondary,
    textAlign: 'center',
  },
});

export default styles;
