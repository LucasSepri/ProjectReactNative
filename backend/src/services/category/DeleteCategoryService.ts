import prismaClient from '../../prisma';
import { deleteFile } from '../../utils/deleteFile';

class DeleteCategoryService {
  async execute(id: string) {
    // Encontra a categoria pelo ID
    const category = await prismaClient.category.findUnique({
      where: {
        id,
      },
      include: {
        products: true, // Inclui os produtos associados para processamento posterior
      },
    });

    if (!category) {
      throw new Error('Categoria não encontrada.');
    }

    // Remove todos os produtos da categoria
    for (const product of category.products) {
      // Remove o produto dos favoritos
      await prismaClient.favorite.deleteMany({
        where: {
          product_id: product.id,
        },
      });

      // Remove a imagem do produto, se houver
      if (product.banner) {
        deleteFile(product.banner.replace('/uploads/', ''));
      }
    }

    // Remove os produtos da categoria
    await prismaClient.product.deleteMany({
      where: {
        category_id: id,
      },
    });

    // Deleta a categoria do banco de dados
    await prismaClient.category.delete({
      where: {
        id,
      },
    });

    return { message: 'Categoria e seus produtos excluídos com sucesso.' };
  }
}

export default new DeleteCategoryService();
