import prisma from '../../prisma';

// Função para criar um novo método de pagamento
export const createPaymentMethod = async (name: string) => {
  try {
    const newPaymentMethod = await prisma.paymentMethod.create({
      data: { name },
    });
    return newPaymentMethod;
  } catch (error) {
    throw new Error('Erro ao criar o método de pagamento');
  }
};

// Função para obter todos os métodos de pagamento
export const getPaymentMethods = async () => {
  try {
    const paymentMethods = await prisma.paymentMethod.findMany();
    return paymentMethods;
  } catch (error) {
    throw new Error('Erro ao buscar os métodos de pagamento');
  }
};

// Função para atualizar um método de pagamento
export const updatePaymentMethod = async (id: string, name: string) => {
  try {
    const updatedPaymentMethod = await prisma.paymentMethod.update({
      where: { id },
      data: { name },
    });
    return updatedPaymentMethod;
  } catch (error) {
    throw new Error('Erro ao atualizar o método de pagamento');
  }
};

// Função para deletar um método de pagamento
export const deletePaymentMethod = async (id: string) => {
  try {
    await prisma.paymentMethod.delete({
      where: { id },
    });
    return { message: 'Método de pagamento excluído com sucesso' };
  } catch (error) {
    throw new Error('Erro ao excluir o método de pagamento');
  }
};
