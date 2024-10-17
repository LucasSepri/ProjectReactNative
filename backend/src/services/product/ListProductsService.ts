import prismaClient from '../../prisma';

class ListProductsService {
    async execute() {
        const products = await prismaClient.product.findMany();
        return products;
    }
}

export default new ListProductsService();
