import { Request, Response } from 'express';
import prismaClient from '../../prisma';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

class LoginUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    // Verifica se o usuário existe
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'Email ou senha incorretos' });
    }

    // Verifica se a senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Email ou senha incorretos' });
    }

    // Gera o token JWT
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET || 'default-secret-key',
      {
        expiresIn: '1d', // Expira em 1 dia
      }
    );

    // Retorna o token e as informações do usuário
    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        profileImage: user.profileImage,
      },
      token,
    });
  }
}

export default new LoginUserController();
