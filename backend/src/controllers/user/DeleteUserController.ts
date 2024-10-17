import prismaClient from '../../prisma';
import { Request, Response } from 'express';
import DeleteUserService from '../../services/user/DeleteUserService';

class DeleteUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.params; // ID do usuário a ser deletado
    const user_id = req.user?.id; // ID do usuário autenticado
    const isAdmin = req.user?.isAdmin; // Verifica se o usuário é administrador

    if (!user_id) {
      return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    // Verifica se o usuário autenticado está tentando excluir outro usuário
    if (id !== user_id && !isAdmin) {
      return res.status(403).json({ error: 'Acesso negado. Você só pode excluir sua própria conta.' });
    }

    // Verifica se o usuário existe
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Deleta o usuário
    try {
      // Chama o serviço de exclusão de usuário
      const result = await DeleteUserService.execute(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new DeleteUserController();



