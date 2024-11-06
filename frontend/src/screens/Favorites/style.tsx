import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingBottom: 90,
  },
  loadingContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  searchContainer: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    elevation: 5,
    paddingHorizontal: 12,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  loader: {
    marginVertical: 20,
  },
  productList: {
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  imageContainer: {
    marginRight: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 4,
  },
  ingredients: {
    opacity: 0.6,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: COLORS.primary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: 16,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  emptyInstruction: {
    fontSize: 16,
    color: COLORS.secondary,
    textAlign: 'center',
  },
});

export default styles;
