import { Request, Response } from 'express';
import { dashboardService } from '../../services/sales/salesService';

class DashboardController {
  // Rota para o resumo de vendas
  async getSalesSummary(req: Request, res: Response) {
    try {
      const summary = await dashboardService.getSalesSummary();
      res.json(summary);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch sales summary.' });
    }
  }

  // Rota para o gráfico de vendas mensais
  async getSalesChart(req: Request, res: Response) {
    try {
      const chartData = await dashboardService.getSalesChart();
      res.json(chartData);  // Envia os dados de vendas por mês
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch sales chart data.' });
    }
  }

  // Rota para a tabela de produtos vendidos
  async getSoldProductsTable(req: Request, res: Response) {
    try {
      const tableData = await dashboardService.getSoldProductsTable();
      res.json(tableData);  // Envia os produtos vendidos
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch sold products table.' });
    }
  }
}

export const dashboardController = new DashboardController();
