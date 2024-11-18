import prismaClient from '../../prisma';

interface ProductRequest {
  name: string;
  price: string; // Altere o tipo de price para string para manipulação
  description: string;
  banner: string;
  category_id: string;
}

class CreateProductService {
  async execute({ name, price, description, banner, category_id }: ProductRequest) {
    // Substitui vírgula por ponto e converte o preço para número
    const formattedPrice = Number(price.replace(',', '.'));

    const product = await prismaClient.product.create({
      data: {
        name,
        price: formattedPrice,  // Salva como Float no Prisma
        description,
        banner,
        category_id,
      },
    });

    return product;
  }
}

export default new CreateProductService();
