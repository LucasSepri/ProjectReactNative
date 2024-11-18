import { StyleSheet } from 'react-native';

const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
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
    color: theme.white,
    backgroundColor: theme.primary,
    textTransform: 'uppercase',
  },
  searchContainer: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: theme.white,
    borderRadius: 8,
    elevation: 5,
    paddingHorizontal: 12,
    borderColor: theme.primary,
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
    backgroundColor: theme.white,
    borderRadius: 8,
    borderBottomColor: theme.border,
    borderBottomWidth: 1,
    padding: 16,
    shadowColor: theme.black,
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
    color: theme.primary,
    marginBottom: 4,
  },
  ingredients: {
    opacity: 0.6,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: theme.primary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: 16,
    color: theme.primary,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  emptyInstruction: {
    fontSize: 16,
    color: theme.secondary,
    textAlign: 'center',
  },
});

export default styles;
