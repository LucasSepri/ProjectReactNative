import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
  },
  picker: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    padding: 8,
    color: COLORS.primary,
  },
  addressContainer: {
    marginBottom: 16,
  },
  addressInput: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    color: COLORS.primary,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  sendButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  }, 
  cartCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 12,
    position: 'relative',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 8,
  },
  cardInfo: {
    flex: 1,
  },
  itemName: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: COLORS.black,
  },
  ingredients: {
    marginBottom: 4,
    color: COLORS.black,
  },
  price: {
    fontWeight: 'bold',
    color: COLORS.black,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 6,
  },

  removeButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  removeButton: {
    backgroundColor: COLORS.red,
    borderRadius: 8,
    padding: 6,
  },
  quantity: {
    marginHorizontal: 8,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  flatList: {
    flexGrow: 1,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 98,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  containerPreco: {
    flexDirection: 'column',
  },
  totalText: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: COLORS.black,
    fontSize: 16,
  },
  totalPrice: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 6,
    color: COLORS.black,
  },
  emptyCartContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 20,
    color: COLORS.black,
  },
  botaoMesaSair: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  textoMesaSair: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginRight: 8,
  },
  iconeMesaSair: {
    color: COLORS.white,
  },
  addressSubmittedContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  addressSubmittedText: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginRight: 8,
  },


});

export default styles;