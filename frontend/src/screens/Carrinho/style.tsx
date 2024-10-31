import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
    paddingBottom: 100,
  },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    alignItems: 'center',
    elevation: 2,
  },
  removeButton: {
    marginRight: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  price: {
    fontSize: 14,
    color: COLORS.secondary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    padding: 5,
    marginHorizontal: 5,
  },
  quantity: {
    fontSize: 16,
    color: COLORS.black,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: 18,
    color: COLORS.darkGrey,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyInstruction: {
    fontSize: 16,
    color: COLORS.grey,
    textAlign: 'center',
  },
  observationInput: {
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    height: 80,
  },
  orderSummary: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  flatList: {
    paddingBottom: 20,
  },
  botaoMesaSair: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  textoMesaSair: {
    color: COLORS.white,
    fontSize: 16,
  },
  iconeMesaSair: {
    color: COLORS.white,
  },
  addressPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressPicker: {
    flex: 1,
    height: 50,
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: COLORS.white,
  },
  enederecoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  qrCodeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 10,
  },
  adicionarEndereco: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    flex: 1,
  },
  adicionarEnderecoText: {
    color: COLORS.white,
    textAlign: 'center',
  },
  
});

export default styles;
