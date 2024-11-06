import { createOrderPayment, deleteOrderPayment, getAllOrderPayments, getOrderPaymentById, updateOrderPayment } from '../../services/orderPayment/orderPaymentService';

class OrderPaymentController {
  // Criar um pagamento
  async create(req, res) {
    const { order_id, intended_payment_id, actual_payment_id } = req.body;

    try {
      const orderPayment = await createOrderPayment({
        order_id,
        intended_payment_id,
        actual_payment_id,
      });
      return res.status(201).json(orderPayment);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar pagamento' });
    }
  }

  // Atualizar um pagamento
  async update(req, res) {
    const { id } = req.params;
    const { intended_payment_id, actual_payment_id } = req.body;

    try {
      const updatedPayment = await updateOrderPayment(id, {
        intended_payment_id,
        actual_payment_id,
      });
      if (updatedPayment) {
        return res.status(200).json(updatedPayment);
      } else {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar pagamento' });
    }
  }

  // Deletar um pagamento
  async delete(req, res) {
    const { id } = req.params;

    try {
      const result = await deleteOrderPayment(id);
      if (result) {
        return res.status(200).json({ message: 'Pagamento deletado com sucesso' });
      } else {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao excluir pagamento' });
    }
  }

  // Buscar um pagamento por ID
  async getById(req, res) {
    const { id } = req.params;

    try {
      const payment = await getOrderPaymentById(id);
      if (payment) {
        return res.status(200).json(payment);
      } else {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar pagamento' });
    }
  }

  // Buscar todos os pagamentos
  async getAll(req, res) {
    try {
      const payments = await getAllOrderPayments();
      return res.status(200).json(payments);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar pagamentos' });
    }
  }
}

export default new OrderPaymentController();
