import prisma from "../../prisma";

class DashboardService {
  async getSalesSummary() {
    const totalSales = await prisma.order.aggregate({
      _sum: { totalPrice: true },
    });

    const activeClients = await prisma.order.findMany({
      select: { user_id: true },
      distinct: ['user_id'],
    });

    const topProducts = await prisma.item.groupBy({
      by: ['product_name'],
      _sum: { amount: true },
      orderBy: { _sum: { amount: 'desc' } },
      take: 2,
    });

    return {
      totalSales: totalSales._sum.totalPrice || 0,
      activeClients: activeClients.length,
      topProducts: topProducts.map(p => p.product_name).join(', '),
    };
  }


  async getSalesChart() {
    // Buscar todas as ordens do ano atual
    const orders = await prisma.order.findMany({
      where: {
        created_at: {
          gte: new Date(new Date().getFullYear(), 0, 1), // Início do ano
          lt: new Date(new Date().getFullYear() + 1, 0, 1), // Fim do ano
        },
      },
      select: {
        created_at: true,
        totalPrice: true,
      },
    });

    // Criar uma estrutura de meses com valores inicializados em 0
    const monthlySales = Array(12).fill(0);

    // Somar vendas por mês
    orders.forEach(order => {
      const month = new Date(order.created_at).getMonth(); // Pega o mês (0 = Janeiro)
      monthlySales[month] += order.totalPrice; // Soma o total ao mês correspondente
    });

    // Retornar os dados formatados
    return monthlySales.map((total, index) => ({
      month: index + 1, // 1 = Janeiro
      total,
    }));
  }


  async getSoldProductsTable() {
    const products = await prisma.item.groupBy({
      by: ['product_name'],
      _sum: {
        amount: true,
        product_price: true,
      },
    });

    return products.map(product => ({
      name: product.product_name,
      quantity: product._sum.amount,
      total: product._sum.amount * product._sum.product_price,
    }));
  }
}

export const dashboardService = new DashboardService();
