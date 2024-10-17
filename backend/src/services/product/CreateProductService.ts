import prismaClient from '../../prisma';

interface ProductRequest {
    name: string;
    price: number; // Certifique-se de que o tipo de price seja number
    description: string;
    banner: string;
    category_id: string;
  }
  
  class CreateProductService {
    async execute({ name, price, description, banner, category_id }: ProductRequest) {
      // Certifique-se de que o price está sendo convertido para número, caso necessário
      const product = await prismaClient.product.create({
        data: {
          name,
          price: Number(price),  // Converte para número explicitamente
          description,
          banner,
          category_id,
        },
      });
  
      return product;
    }
  }
  
  
  
  

export default new CreateProductService();
