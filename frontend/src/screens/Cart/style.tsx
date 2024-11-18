import { StyleSheet } from 'react-native';

const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingBottom: 90,
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
  addressPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  addressPicker: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.primary,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  qrCodeButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: theme.primary,
    borderRadius: 5,
  },
  addAddressButton: {
    flex: 1,
    backgroundColor: theme.primary,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addAddressText: {
    color: theme.white,
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
    borderColor: theme.text,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textAddress: {
    color: theme.text,
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
    backgroundColor: theme.primary,
    color: theme.white,
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 10,
    fontSize: 16,
  },
  cartCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderColor: theme.border,
    borderBottomWidth: 1,
    backgroundColor: theme.white,
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
    borderRadius: 10,
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
    color: theme.secondary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: theme.primary,
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
    borderColor: theme.background,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.white,
  },
  orderButton: {
    flexDirection: 'column',
    backgroundColor: theme.primary,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  orderTextButton: {
    color: theme.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  observationContainer: {
    marginHorizontal: 16,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: theme.background,
    padding: 10,
  },
  observationInput: {
    borderRadius: 5,
    color: theme.text,
  },

  charCountText: {
    color: theme.danger,
    fontSize: 12,
    marginTop: 5,
    textAlign: 'right', // opcional, ajuste conforme necessário
  },


  flatList: {
    flexGrow: 1,
  },
  textLoading: {
    color: theme.primary,
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
  botaoMesaSair: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.primary,
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  textoMesaSair: {
    color: theme.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconeMesaSair: {
    marginLeft: 10,
    color: theme.white,
  },


  modalOverlayP: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainerP: {
    width: '90%',
    padding: 20,
    backgroundColor: theme.background,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: theme.text,
  },
  paymentMethodItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedPaymentMethod: {
    borderColor: theme.primary,
    backgroundColor: theme.primary,
  },
  paymentMethodText: {
    fontSize: 16,
    color: theme.text,
  },
  confirmButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: theme.primary,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    color: theme.white,
    fontWeight: 'bold',
  },
  closeModalButtonP: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  closeModalTextP: {
    fontSize: 14,
    color: theme.danger,
  },

});


export default styles;
