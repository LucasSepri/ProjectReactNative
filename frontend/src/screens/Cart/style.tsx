import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingBottom: 90,
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
  addressPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  addressPicker: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  qrCodeButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  addAddressButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addAddressText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '100%',
    height: '100%',
  },
  addressItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: COLORS.text,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textAddress: {
    color: COLORS.text,
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  closeModalButton: {
    marginTop: 10,
    padding: 10,
    alignSelf: 'center',
  },
  closeModalText: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 10,
    fontSize: 16,
  },
  cartCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderColor: COLORS.border,
    borderBottomWidth: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 3,
    marginHorizontal: 16,
    marginBottom: 10,

  },
  removeButton: {
    marginRight: 10,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  cardInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
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
    padding: 5,
    borderRadius: 5,
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  orderSummary: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: COLORS.background,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  orderButton: {
    flexDirection: 'column',
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  orderTextButton: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  observationInput: {
    marginHorizontal: 16,
    padding: 10,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: COLORS.background,
    color: COLORS.text,
  },
  flatList: {
    flexGrow: 1,
  },
  textLoading:{
    color: COLORS.primary,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    flexGrow: 1,
    textAlignVertical: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  emptyMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },
  emptyInstruction: {
    fontSize: 14,
    color: COLORS.text,
  },
  botaoMesaSair: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  textoMesaSair: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconeMesaSair: {
    marginLeft: 10,
    color: COLORS.white,
  },
});


export default styles;
