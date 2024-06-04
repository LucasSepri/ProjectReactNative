
import prismaClient from "../../prisma";

interface CategoryRequest {
    id: string;
}

class DeleteCategoryService {
    async execute({ id }: CategoryRequest) {
        const category = await prismaClient.category.delete({
            where: { id }
        });

        return category;
    }
}

export { DeleteCategoryService };
