import { PrismaClient } from '@prisma/client';
import { Server, Socket } from 'socket.io';

const prisma = new PrismaClient();

export const setupChatSocket = (socket: Socket, io: Server) => {
    /**
     * Verifica se o usuário é administrador.
     */
    const isAdminUser = async (userId: string) => {
        if (!userId) {
            return false;
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user || !user.isAdmin) {
            return false;
        }
        return true;
    };


    /**
     * Evento: Buscar todos os chats (Somente Administradores)
     */
    socket.on('getAllChats', async (userId) => {
        if (!(await isAdminUser(userId))) return;

        try {
            const chats = await prisma.chat.findMany({
                include: {
                    users: { select: { id: true, name: true, profileImage: true } },
                    messages: {
                        where: { isRead: false }, // Filtra mensagens não lidas
                        orderBy: { timestamp: 'desc' },
                    },
                },
            });

            // Para cada chat, contar o número de mensagens não lidas
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
     * Evento: Buscar mensagens de um chat
     */
    socket.on('getMessages', async (data) => {
        // Valida se o objeto foi enviado
        if (!data || typeof data !== 'object') {
            socket.emit('error', { message: 'Parâmetros inválidos ou ausentes.' });
            return;
        }

        const { chatId, userId } = data;
        // console.log('getMessages', { chatId, userId });

        // Valida os campos obrigatórios
        if (chatId == null && userId == null) {
            socket.emit('error', { message: 'Chat ID ou User ID não fornecido.' });
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
                //console.error('Chat não encontrado:', chatId);
                //socket.emit('error', { message: 'Chat não encontrado.' });
                return;
            }

            // Se o usuário for administrador, marca as mensagens como lidas
            if (await isAdminUser(userId)) {
                await prisma.message.updateMany({
                    where: { chatId: chatId, isRead: false },
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
     * Evento: Enviar mensagem
     */
    socket.on('sendMessage', async ({ content, chatId, userId }) => {
        if (!content || !userId) {
            socket.emit('error', { message: 'Conteúdo ou User ID não fornecido.' });
            return;
        }
        try {
            let chat = chatId
                ? await prisma.chat.findUnique({ where: { id: chatId } })
                : await prisma.chat.findFirst({
                    where: { users: { some: { id: userId } } },
                });

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

            // Emitir para todos os administradores conectados
            io.sockets.emit('receiveMessage', message);  // Isso emite para todos os sockets conectados, incluindo o que enviou a mensagem.
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            socket.emit('error', { message: 'Erro ao enviar mensagem.' });
        }
    });


    /**
     * Evento: Deletar mensagem (Somente Administradores)
     */
    socket.on('deleteMessage', async ({ messageId, chatId, userId }) => {
        console.log('deleteMessage', { messageId, chatId, userId });
        if (!(await isAdminUser(userId))) return;

        try {
            const message = await prisma.message.findUnique({
                where: { id: messageId },
                include: { chat: true },
            });

            if (!message || message.chatId !== chatId) {
                socket.emit('error', { message: 'Mensagem não encontrada ou inválida.' });
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
     * Evento: Deletar chat (Somente Administradores)
     */
    socket.on('deleteChat', async ({ chatId, userId, chatUserId }) => {
        if (!(await isAdminUser(userId))) return;

        try {
            await prisma.chat.delete({ where: { id: chatId } });
            io.emit('chatDeleted', { chatId, chatUserId });
        } catch (error) {
            console.error('Erro ao deletar chat:', error);
            socket.emit('error', { message: 'Erro ao deletar chat.' });
        }
    });

};
