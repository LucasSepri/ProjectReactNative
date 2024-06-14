import prismaClient from "../../prisma";

interface ProductRequest {
  name: string;
  price: string;
  description: string;
  banner: string;
  category_id: string;
}


class CreateProductService {
  async execute({ name, price, description, banner, category_id }: ProductRequest) {
    let Corrigido = null;
    if (banner) {
      const parts = banner.split(/[\\/]+/);
      Corrigido = parts[parts.length - 1];
    }
    const product = await prismaClient.product.create({
      data: {
        name: name,
        price: price,
        description: description,
        banner: Corrigido,
        category_id: category_id,
      }
    });

    return product;
  }
}

export { CreateProductService };