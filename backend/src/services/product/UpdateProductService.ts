import prismaClient from "../../prisma";

interface ProductRequest {  
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
}


class UpdateProductService {
  async execute({id, name, price, description, banner, category_id}: ProductRequest) {
    const product = await prismaClient.product.update({
      data: {
          name: name,
          price: price,
          description: description,
          banner: banner,
          category_id: category_id,
      }, 
      where: { id },
  });

  return product;
  }
}

export { UpdateProductService };