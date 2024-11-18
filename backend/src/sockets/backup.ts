import { PrismaClient } from '@prisma/client';
import { Server } from 'socket.io';
import { isAdmin } from '../middlewares/isAdmin';

const prisma = new PrismaClient();

export const setupSocket = (io: Server) => {
    io.on('connection', (socket) => {
        // const { userId } = socket.handshake.auth;
        // socket.data.userId = userId;

        // if (!userId) {
        //     console.log('User ID não fornecido na conexão');
        //     return;
        // }

        // Evento para buscar todos os chats disponíveis para administradores
        socket.on('getAllChats', async (userId) => {
            try {
                const user = await prisma.user.findUnique({ where: { id: userId } });

                if (user.isAdmin === false) {
                    console.log('Acesso negado: usuário não é administrador');
                    return;
                }

                // Carrega todos os chats, incluindo detalhes dos usuários e mensagens
                const chats = await prisma.chat.findMany({
                    include: {
                        users: true,
                        messages: {
                            orderBy: { timestamp: 'asc' }, // Mensagens em ordem cronológica
                        },
                    },
                });

                socket.emit('loadAllChats', chats);
            } catch (error) {
                console.error("Erro ao carregar chats para administradores:", error);
            }
        });

        socket.on('getMessages', async (chatId, userId) => {
            if (!chatId && !userId) {
                console.log('Chat ID ou User ID não fornecido');
                return;
            }

            try {
                let messages;
                let foundChatId;

                if (chatId) {
                    messages = await prisma.message.findMany({
                        where: { chatId: chatId },
                        include: {
                            sender: {
                                select: {
                                    name: true,
                                    profileImage: true,
                                    isAdmin: true,
                                },
                            }
                        },
                        orderBy: { timestamp: 'desc' },
                    });
                    console.log('Mensagens encontradas:', messages);
                    foundChatId = chatId;
                } else {
                    try {
                        const chat = await prisma.chat.findFirst({
                            where: {
                                users: { some: { id: userId } },
                            },
                            include: {
                                messages: {
                                    orderBy: { timestamp: 'desc' },
                                    include: {
                                        sender: {
                                            select: {
                                                name: true,
                                                profileImage: true,
                                                isAdmin: true,
                                            },
                                        },
                                    },
                                },
                                users: true,
                            },
                        });
                        messages = chat.messages;
                        foundChatId = chat.id;
                    } catch (error) {
                        return;
                    }
                }

                socket.emit('loadMessages', messages, foundChatId);
            } catch (error) {
                console.error('Erro ao buscar mensagens do chat:', error);
            }
        });



        socket.on('sendMessage', async (data) => {
            try {
                const { content, chatId, userId } = data;
                // Encontre o chat pelo ID ou crie um novo se não houver um chatId fornecido
                let chat;
                if (chatId) {
                    chat = await prisma.chat.findUnique({
                        where: { id: chatId },
                    });
                }

                if (!chat) {
                    // Se não encontrou o chat ou não existe o chatId, busque um chat existente baseado no usuário
                    // chat = await prisma.chat.findFirst({
                    //     where: {
                    //         users: {
                    //             some: {
                    //                 id: userId,
                    //                 isAdmin: false,

                    //             }
                    //         },
                    //         messages: { some: { senderId: userId } },
                    //     },
                    // });
                    chat = await prisma.chat.findFirst({
                        where: {
                            users: {
                                some: { id: userId, isAdmin: false },
                            },
                        },
                    });

                    if (!chat) {
                        // Se não encontrar chat existente, cria um novo
                        chat = await prisma.chat.create({
                            data: {
                                users: {
                                    connect: [{ id: userId }],
                                },
                            },
                        });
                    }
                }

                // Criação da mensagem associada ao chat
                const message = await prisma.message.create({
                    data: {
                        content,
                        senderId: userId,
                        chatId: chat.id,
                    },
                    include: { sender: true },
                });

                let user;
                // Verificar se o usuário existe e enviar a resposta
                try {
                    user = await prisma.user.findUnique({
                        where: { id: userId },
                    });
                } catch (error) {
                    console.log('Usuário não encontrado');
                }

                if (user) {
                    // Verifica se o usuário é admin e emite um evento
                    const userIsAdmin = user.isAdmin;
                    socket.emit('teste', userIsAdmin);
                }

                // Envia a mensagem para todos os administradores conectados
                io.emit('receiveMessage', message);

            } catch (error) {
                console.error("Erro ao enviar mensagem:", error);
            }
        });



        // Adicione no setupSocket
        socket.on('deleteMessage', async ({ messageId, chatId, userId }) => {
            try {
                // Verifique se o usuário é admin
                const user = await prisma.user.findUnique({ where: { id: userId } });
                if (!user || !user.isAdmin) {
                    console.log('Acesso negado: somente administradores podem deletar mensagens');
                    return;
                }

                // Verifique se a mensagem existe e pertence ao chat fornecido
                const message = await prisma.message.findUnique({
                    where: { id: messageId },
                    include: { chat: true }
                });

                if (!message || message.chatId !== chatId) {
                    console.log('Mensagem não encontrada ou não pertence ao chat especificado');
                    return;
                }

                // Exclua a mensagem
                await prisma.message.delete({ where: { id: messageId } });

                // Notifique os clientes conectados sobre a exclusão
                io.emit('messageDeleted', { messageId, chatId });
            } catch (error) {
                console.error('Erro ao deletar a mensagem:', error);
            }
        });

        socket.on('deleteChat', async (chatId, userId, chatUserId) => {
            try {
                const user = await prisma.user.findUnique({ where: { id: userId } });

                if (!user || !user.isAdmin) {
                    console.log('Acesso negado: somente administradores podem deletar chats');
                    return;
                }

                // Exclui o chat
                await prisma.chat.delete({
                    where: { id: chatId },
                });

                // Notifica todos os administradores sobre a exclusão do chat
                io.emit('chatDeleted', chatId, chatUserId);  // Evento para notificar todos os clientes sobre a exclusão
            } catch (error) {
                console.error('Erro ao deletar o chat:', error);
            }
        });





        socket.on('disconnect', () => {
            console.log(`Cliente desconectado: ${socket.id}`);
        });
    });
};
