// services/address/DeleteAddressService.ts
import prisma from '../../prisma';

class DeleteAddressService {
  async execute(id: string) {
    try {
      const address = await prisma.address.findUnique({ where: { id } });
      
      if (!address) {
        throw new Error("Endereço não encontrado");
      }

      await prisma.address.delete({ where: { id } });
      return { message: "Endereço deletado com sucesso" };
    } catch (error) {
      throw new Error(`Erro ao deletar endereço: ${error.message}`);
    }
  }
}

export default new DeleteAddressService();
