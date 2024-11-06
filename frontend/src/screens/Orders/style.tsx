import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginBottom: '22%',
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.white,
    backgroundColor: COLORS.primary,
    textTransform: 'uppercase',
  },
  filterContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    margin: 16,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
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
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  dateButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterButton: {
    backgroundColor: COLORS.secondary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderCard: {
    backgroundColor: COLORS.white,
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
    margin: 16,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 4,
    color: COLORS.text,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: COLORS.danger,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  emptyContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage:{
    fontSize: 16,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  emptyInstruction:{
    fontSize: 16,
    color: COLORS.secondary,
    textAlign: 'center',
  },
});

export default styles;
