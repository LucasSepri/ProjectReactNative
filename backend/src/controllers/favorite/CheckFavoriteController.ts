import { Request, Response } from 'express';
import CheckFavoriteService from '../../services/favorite/CheckFavoriteService';

class CheckFavoriteController {
    async handle(req: Request, res: Response) {
        const userId = req.user.id; // Assume que o ID do usuário está no req.user
        const { productId } = req.params; // Obtém o productId dos parâmetros da URL

        try {
            const result = await CheckFavoriteService.execute(userId, productId);
            return res.status(200).json(result);
        } catch (error) {
            console.error('Erro ao verificar favorito:', error);
            return res.status(400).json({ error: 'Erro ao verificar favorito. Tente novamente mais tarde.' });
        }
    }
}

export default new CheckFavoriteController();
