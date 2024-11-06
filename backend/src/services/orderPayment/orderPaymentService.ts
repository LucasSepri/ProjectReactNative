import prisma from '../../prisma';

class OrderPaymentService {
  // Criar um pagamento
  async createOrderPayment({ order_id, intended_payment_id, actual_payment_id }) {
    return await prisma.orderPayment.create({
      data: {
        order: { connect: { id: order_id } },
        intendedPayment: intended_payment_id
          ? { connect: { id: intended_payment_id } }
          : undefined,
        actualPayment: actual_payment_id
          ? { connect: { id: actual_payment_id } }
          : undefined,
      },
    });
  }

  // Atualizar um pagamento
  async updateOrderPayment(id, { intended_payment_id, actual_payment_id }) {
    return await prisma.orderPayment.update({
      where: { id },
      data: {
        intendedPayment: intended_payment_id
          ? { connect: { id: intended_payment_id } }
          : undefined,
        actualPayment: actual_payment_id
          ? { connect: { id: actual_payment_id } }
          : undefined,
      },
    });
  }

  // Deletar um pagamento
  async deleteOrderPayment(id) {
    return await prisma.orderPayment.delete({
      where: { id },
    });
  }

  // Buscar um pagamento por ID
  async getOrderPaymentById(id) {
    return await prisma.orderPayment.findUnique({
      where: { id },
      include: {
        intendedPayment: true,
        actualPayment: true,
      },
    });
  }

  // Buscar todos os pagamentos
  async getAllOrderPayments() {
    return await prisma.orderPayment.findMany({
      include: {
        intendedPayment: true,
        actualPayment: true,
      },
    });
  }
}

// Exportando as funções diretamente para o controller
export const createOrderPayment = new OrderPaymentService().createOrderPayment;
export const updateOrderPayment = new OrderPaymentService().updateOrderPayment;
export const deleteOrderPayment = new OrderPaymentService().deleteOrderPayment;
export const getOrderPaymentById = new OrderPaymentService().getOrderPaymentById;
export const getAllOrderPayments = new OrderPaymentService().getAllOrderPayments;
