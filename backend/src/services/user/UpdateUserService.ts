import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { deleteFile } from '../../utils/deleteFile';

const prisma = new PrismaClient();

interface UpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  profileImage?: string;
}

class UpdateUserService {
  async execute({ id, name, email, password, profileImage }: UpdateUserRequest) {
    // Encontra o usuário pelo ID
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    // Verifica se o novo e-mail já está em uso por outro usuário
    if (email && email !== user.email) {
      const emailExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (emailExists) {
        throw new Error('E-mail já cadastrado por outro usuário.');
      }
    }

    // Deleta a imagem existente, se houver
    if (user.profileImage && profileImage) {
      deleteFile(user.profileImage.replace('/uploads/', ''));
    }

    // Atualiza os dados do usuário
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: name ?? user.name,
        email: email ?? user.email,
        password: password ? await bcrypt.hash(password, 8) : user.password,
        profileImage: profileImage ?? user.profileImage,
      },
    });

    return updatedUser;
  }
}

export default new UpdateUserService();
