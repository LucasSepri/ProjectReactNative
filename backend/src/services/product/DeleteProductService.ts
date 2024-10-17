import prismaClient from '../../prisma';
import { deleteFile } from '../../utils/deleteFile';

class DeleteProductService {
  async execute(id: string) {
    // Encontra o produto pelo ID
    const product = await prismaClient.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new Error('Produto não encontrado.');
    }

    // Remove o produto dos favoritos, se estiver favoritado
    await prismaClient.favorite.deleteMany({
      where: {
        product_id: id,
      },
    });

    // Deleta a imagem associada ao produto, se houver
    if (product.banner) {
        deleteFile(product.banner.replace('/uploads/', ''));
      }

    // Deleta o produto do banco de dados
    await prismaClient.product.delete({
      where: {
        id,
      },
    });

    return { message: 'Produto excluído com sucesso.' };
  }
}

export default new DeleteProductService();
