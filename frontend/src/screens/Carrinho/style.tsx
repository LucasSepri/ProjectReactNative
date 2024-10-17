import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    marginBottom: "22%",
  },
  picker: {
    marginBottom: 10,
    color: COLORS.primary,
    backgroundColor: COLORS.white, 
    marginHorizontal: 16,
    
  },
  addressInput: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    color: COLORS.primary,
    backgroundColor: COLORS.white, // Melhorar visibilidade
    fontSize: 16, // Aumentar tamanho da fonte
    marginHorizontal: 16,

  },
  sendButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  sendButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16, // Aumentar tamanho da fonte
  },
  cartCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4, // Aumentar a altura da sombra
    },
    shadowOpacity: 0.3, // Aumentar a opacidade da sombra
    shadowRadius: 8, // Aumentar o raio da sombra
    elevation: 5, // Aumentar a elevação
    marginHorizontal: 16, // Adicionar margem horizontal para evitar o corte
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
    fontSize: 16, // Tamanho de fonte maior
  },
  price: {
    fontWeight: 'bold',
    color: COLORS.primary,
    fontSize: 16, // Tamanho de fonte maior
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 8,
  },
  removeButtonContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 1,
  },
  removeButton: {
    backgroundColor: COLORS.red,
    borderRadius: 8,
    padding: 6,
  },
  quantity: {
    marginHorizontal: 12,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  flatList: {
    flexGrow: 1,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginHorizontal: 16,
    paddingHorizontal: 36,
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
    color: COLORS.primary,
  },
  emptyCartContainer: {
    flex: 1,
    paddingHorizontal: 16,
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
    marginVertical: 16,
    marginHorizontal: 16,
  },
  textoMesaSair: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 16, // Aumentar tamanho da fonte
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
    marginHorizontal: 16,
  },
  addressSubmittedText: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 16, // Aumentar tamanho da fonte
  },
});

export default styles;
