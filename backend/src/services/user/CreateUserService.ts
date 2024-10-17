import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

interface UserRequest {
  name: string;
  email: string;
  password: string;
  profileImage?: string; // Campo opcional para a imagem do perfil
}

class CreateUserService {
  async execute({ name, email, password, profileImage }: UserRequest) {
    // Verifica se o e-mail já existe
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new Error('E-mail já cadastrado.');
    }

    // Encripta a senha
    const hashedPassword = await bcrypt.hash(password, 8);

    // Cria o novo usuário no banco
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profileImage, // Adiciona a imagem de perfil, se fornecida
      },
    });

    // Verifica se já existe um administrador
    const adminExists = await prisma.user.findFirst({
      where: {
        isAdmin: true,
      },
    });

    // Se não houver administrador, define o primeiro usuário como administrador
    if (!adminExists) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isAdmin: true,
        },
      });
    }

    // Recupera o usuário atualizado para garantir que a resposta reflete o status correto
    const updatedUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    return updatedUser;
  }
}

export default new CreateUserService();
