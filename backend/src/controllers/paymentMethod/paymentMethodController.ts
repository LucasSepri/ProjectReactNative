import { Request, Response } from 'express';
import {
  createPaymentMethod,
  getPaymentMethods,
  updatePaymentMethod,
  deletePaymentMethod,
} from '../../services/paymentMethod/paymentMethodService';

// Criar um novo método de pagamento
export const createPaymentMethodController = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const newPaymentMethod = await createPaymentMethod(name);
    res.status(201).json(newPaymentMethod);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar todos os métodos de pagamento
export const getPaymentMethodsController = async (req: Request, res: Response) => {
  try {
    const paymentMethods = await getPaymentMethods();
    res.status(200).json(paymentMethods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um método de pagamento
export const updatePaymentMethodController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedPaymentMethod = await updatePaymentMethod(id, name);
    res.status(200).json(updatedPaymentMethod);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Excluir um método de pagamento
export const deletePaymentMethodController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await deletePaymentMethod(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
