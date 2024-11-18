import prisma from "../../prisma"; // Importando o cliente Prisma

class ListAllOrdersService {
  async execute() {
    const orders = await prisma.order.findMany({
      include: {
        items: true, // Inclui os itens relacionados ao pedido
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
      orderBy: {
        created_at: "desc", // Ordena por data de criação (mais recente primeiro)
      },
    });

    return orders;
  }
}

export { ListAllOrdersService };
