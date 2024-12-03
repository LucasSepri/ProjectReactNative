import { Request, Response } from "express";
import CashierService from "..//../services/order/CashierService";

class CashierController {
  async closeDailyCashier(req: Request, res: Response) {
    try {
      const result = await CashierService.closeDailyCashier();
      
      // Log do resultado
      console.log("Resultado do fechamento do caixa:", result);
      
      return res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao fechar o caixa:", error);
      return res.status(500).json({ error: "Erro ao fechar o caixa." });
    }
  }
}

export default new CashierController();
