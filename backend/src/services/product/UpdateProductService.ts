import { PrismaClient } from '@prisma/client';
import { deleteFile } from '../../utils/deleteFile';

const prisma = new PrismaClient();

interface UpdateProductRequest {
  id: string;
  name?: string;
  price?: number;
  description?: string;
  banner?: string;
  category_id?: string;
}

class UpdateProductService {
  async execute({ id, name, price, description, banner, category_id }: UpdateProductRequest) {
    // Encontra o produto pelo ID
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new Error('Produto não encontrado.');
    }

    // Deleta a imagem existente, se houver e se uma nova imagem for fornecida
    if (product.banner && banner && banner !== product.banner) {
      deleteFile(product.banner.replace('/uploads/', ''));
    }

    // Atualiza os dados do produto
    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name: name ?? product.name,
        price: price ?? product.price,
        description: description ?? product.description,
        banner: banner ?? product.banner,
        category_id: category_id ?? product.category_id,
      },
    });

    return updatedProduct;
  }
}

export default new UpdateProductService();
