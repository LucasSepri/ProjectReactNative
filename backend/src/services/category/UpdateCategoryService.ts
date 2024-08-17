// services/category/UpdateCategoryService.ts
import prismaClient from "../../prisma";

interface CategoryRequest {
    id: string;
    name: string;
}

class UpdateCategoryService {
    async execute({ id, name }: CategoryRequest) {
        if (name === '') {
            throw new Error('Nome inválido');
        }

        const category = await prismaClient.category.update({
            where: { id },
            data: { name },
            select: {
                id: true,
                name: true
            }
        });

        return category;
    }
}

export { UpdateCategoryService };
