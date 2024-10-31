// controllers/ListAddressesController.js
import ListAddressesService from '../../services/address/ListAddressesService';

class ListAddressesController {
  async handle(req, res) {
    const { user_id } = req;

    const listAddressesService = new ListAddressesService();

    try {
      const addresses = await listAddressesService.execute(user_id);
      return res.json(addresses);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new ListAddressesController();
