import prismaClient from "../../prisma";
import path from "path";

interface ProductRequest {  
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
}


class CreateProductService {
  async execute({name, price, description, banner, category_id}: ProductRequest) {

    const bannerName = banner ? path.basename(banner) : null;
    const product = await prismaClient.product.create({
      data: {
          name: name,
          price: price,
          description: description,
          banner: bannerName,
          category_id: category_id,
      }
  });

  return product;
  }
}

export { CreateProductService };