import { PrismaClient } from '@prisma/client';
import { Server, Socket } from 'socket.io';

const prisma = new PrismaClient();

export const setupChatSocket = (socket: Socket, io: Server) => {
  /**
   * Valida se um usuário é administrador.
   * @param userId ID do usuário.
   */
  const isAdminUser = async (userId: string): Promise<boolean> => {
    try {
      if (!userId) return false;
      const user = await prisma.user.findUnique({ where: { id: userId } });
      return user?.isAdmin || false;
    } catch (error) {
      console.error('Erro ao verificar administrador:', error);
      return false;
    }
  };

  /**
   * Handler para o evento de buscar todos os chats.
   * Apenas administradores podem acessar.
   */
  socket.on('getAllChats', async (userId) => {
    if (!(await isAdminUser(userId))) return;

    try {
      const chats = await prisma.chat.findMany({
        include: {
          users: { select: { id: true, name: true, profileImage: true } },
          messages: {
            where: { isRead: false },
            orderBy: { timestamp: 'desc' },
          },
        },
      });

      const chatsWithUnreadCount = chats.map(chat => ({
        ...chat,
        unreadCount: chat.messages.length,
      }));

      socket.emit('loadAllChats', chatsWithUnreadCount);
    } catch (error) {
      console.error('Erro ao buscar chats:', error);
      socket.emit('error', { message: 'Erro ao carregar chats.' });
    }
  });

  /**
   * Handler para buscar mensagens de um chat.
   */
  socket.on('getMessages', async ({ chatId, userId }) => {
    if (!chatId && !userId) {
      socket.emit('error', { message: 'Chat ID ou User ID é obrigatório.' });
      return;
    }

    try {
      const chat = chatId
        ? await prisma.chat.findUnique({
          where: { id: chatId },
          include: {
            messages: {
              orderBy: { timestamp: 'desc' },
              include: { sender: true },
            },
          },
        })
        : await prisma.chat.findFirst({
          where: { users: { some: { id: userId } } },
          include: {
            messages: {
              orderBy: { timestamp: 'desc' },
              include: { sender: true },
            },
          },
        });

      if (!chat) {
        return;
      }

      if (await isAdminUser(userId)) {
        await prisma.message.updateMany({
          where: { chatId: chat.id, isRead: false },
          data: { isRead: true },
        });
      }

      socket.emit('loadMessages', chat.messages, chat.id);
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
      socket.emit('error', { message: 'Erro ao buscar mensagens.' });
    }
  });

  /**
   * Marcar mensagens como lidas.
   */
  socket.on('markMessagesAsRead', async ({ chatId }) => {
    try {
      await prisma.message.updateMany({
        where: { chatId, isRead: false },
        data: { isRead: true },
      });
    } catch (error) {
      console.error('Erro ao marcar mensagens como lidas:', error);
    }
  });


  /**
   * Enviar mensagem.
   */
  socket.on('sendMessage', async ({ content, chatId, userId }) => {
    if (!content || !userId) {
      socket.emit('error', { message: 'Conteúdo ou User ID não fornecido.' });
      return;
    }

    try {
      let chat = chatId
        ? await prisma.chat.findUnique({ where: { id: chatId } })
        : await prisma.chat.findFirst({ where: { users: { some: { id: userId } } } });


      if (!chat) {
        chat = await prisma.chat.create({
          data: { users: { connect: { id: userId } } },
        });
      }

      const message = await prisma.message.create({
        data: {
          content,
          senderId: userId,
          chatId: chat.id,
        },
        include: { sender: true },
      });

      io.sockets.emit('receiveMessage', message);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      socket.emit('error', { message: 'Erro ao enviar mensagem.' });
    }
  });

  /**
   * Deletar mensagem (Apenas administradores).
   */
  socket.on('deleteMessage', async ({ messageId, chatId, userId }) => {
    if (!(await isAdminUser(userId))) return;

    try {
      const message = await prisma.message.findUnique({ where: { id: messageId } });

      if (!message || message.chatId !== chatId) {
        socket.emit('error', { message: 'Mensagem inválida.' });
        return;
      }

      await prisma.message.delete({ where: { id: messageId } });
      io.emit('messageDeleted', { messageId, chatId });
    } catch (error) {
      console.error('Erro ao deletar mensagem:', error);
      socket.emit('error', { message: 'Erro ao deletar mensagem.' });
    }
  });

  /**
   * Deletar chat (Apenas administradores).
   */
  socket.on('deleteChat', async ({ chatId, userId }) => {
    if (!(await isAdminUser(userId))) return;

    try {
      const chat = await prisma.chat.findUnique({ where: { id: chatId }, include: { users: true } });

      if (!chat) {
        socket.emit('error', { message: 'Chat não encontrado.' });
        return;
      }

      // Emitir para todos os sockets, incluindo o ID do usuário do chat
      io.emit('chatDeleted', { chatId, chatUserId: chat.users.map(user => user.id) });
      await prisma.chat.delete({ where: { id: chatId } });
    } catch (error) {
      console.error('Erro ao deletar chat:', error);
      socket.emit('error', { message: 'Erro ao deletar chat.' });
    }
  });

};
