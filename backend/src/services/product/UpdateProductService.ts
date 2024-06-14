import prismaClient from "../../prisma";
import fs from "fs/promises"; // Importar o módulo fs para manipulação de arquivos

interface ProductRequest {
    id: string;
    name?: string;
    price?: string;
    description?: string;
    banner?: string;
    category_id?: string;
}

class UpdateProductService {
    async execute({ id, name, price, description, banner, category_id }: ProductRequest) {
        // Buscar o produto no banco de dados
        const product = await prismaClient.product.findUnique({
            where: { id },
        });

        if (!product) {
            throw new Error("Product not found");
        }

        // Prepare os dados para a atualização
        const productData: any = {};
        if (name) productData.name = name;
        if (price) productData.price = price;
        if (description) productData.description = description;
        if (banner) {
            // Remover a imagem antiga do banner se existir
            if (product.banner) {
                try {
                    await fs.unlink(`${__dirname}/../../../tmp/${product.banner}`);
                } catch (error) {
                    console.error("Error removing old product banner:", error);
                }
            }
            // Definir o novo banner
            let Corrigido = null;
            if (banner) {
                const parts = banner.split(/[\\/]+/);
                Corrigido = parts[parts.length - 1];
            }
            productData.banner = Corrigido;
        }
        if (category_id) productData.category_id = category_id;

        // Atualizar o produto com os novos detalhes
        const updatedProduct = await prismaClient.product.update({
            where: { id },
            data: productData,
        });

        return updatedProduct;
    }
}

export { UpdateProductService };
