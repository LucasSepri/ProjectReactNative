// services/category/UpdateCategoryService.ts
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
    async execute({ id, name, price, description, banner, category_id }: ProductRequest) {
        if (name === '' && price === '' && description === '' && banner === '' && category_id === '') {
            throw new Error('preencha todos.');
        }

        const product = await prismaClient.product.update({
            where: { id },
            data: {
                name: name,
                price: price,
                description: description,
                banner: banner.split(process.env.FTP === 'true' ? "/" : "\\").pop(),
                category_id: category_id,
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
                category_id: true,
            }
        });

        return product;
    }
}

export { UpdateProductService };
