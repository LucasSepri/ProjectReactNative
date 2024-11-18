import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, StyleSheet, Text, Alert, Image } from 'react-native';
import { GiftedChat, InputToolbar, Send, Bubble } from 'react-native-gifted-chat';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../../../context/AuthContext';
import socket from '../../../services/socket';
import { api } from '../../../services/api';
import { ThemeContext } from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';

export default function AdminChatResponseScreen({ route }) {
    const theme = useContext(ThemeContext);
    const { user } = useContext(AuthContext);
    const { chatId } = route.params;
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            if (chatId && user.id) {
                socket.emit('getMessages', { chatId });
            }

            const loadMessagesListener = (messages) => {
                const formattedMessages = messages.map((msg) => ({
                    _id: msg.id,
                    text: msg.content,
                    createdAt: new Date(msg.timestamp),
                    user: {
                        _id: msg.senderId,
                        name: msg.senderId === user.id ? 'Você' : msg.sender.name,
                        avatar: api.defaults.baseURL + msg.sender.profileImage,
                        isAdmin: msg.sender.isAdmin,
                    },
                }));
                setMessages(formattedMessages);
            };

            const receiveMessageListener = (message) => {
                if (message.chatId !== chatId) return;
                const formattedMessage = {
                    _id: message.id,
                    text: message.content,
                    createdAt: new Date(message.timestamp),
                    user: {
                        _id: message.senderId,
                        name: message.senderId === user.id ? 'Você' : message.sender.name,
                        avatar: api.defaults.baseURL + message.sender.profileImage,
                        isAdmin: message.sender.isAdmin,
                    },
                };
                setMessages((prevMessages) => [formattedMessage, ...prevMessages]);
            };

            const messageDeletedListener = ({ chatId: deletedChatId, messageId }) => {
                if (deletedChatId === chatId) {
                    setMessages((prevMessages) =>
                        prevMessages.filter((msg) => msg._id !== messageId)
                    );
                }
            };

            socket.on('loadMessages', loadMessagesListener);
            socket.on('receiveMessage', receiveMessageListener);
            socket.on('messageDeleted', messageDeletedListener);

            return () => {
                socket.off('loadMessages', loadMessagesListener);
                socket.off('receiveMessage', receiveMessageListener);
                socket.off('messageDeleted', messageDeletedListener);
            };
        }, [chatId, user.id, theme])
    );

    const handleSendMessage = (newMessages = []) => {
        if (newMessages.length > 0) {
            const newMessage = newMessages[0];
            socket.emit('sendMessage', {
                content: newMessage.text,
                chatId,
                userId: user.id,
            });
        }
    };

    const deleteMessage = (messageId) => {
        socket.emit('deleteMessage', { messageId, chatId, userId: user.id });
        setMessages((prevMessages) =>
            prevMessages.filter((msg) => msg._id !== messageId)
        );
    };

    const handleTyping = () => {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 1000);
    };

    const renderInputToolbar = (props) => (
        <InputToolbar
            {...props}
            containerStyle={styles(theme).inputContainer}
            textInputStyle={styles(theme).inputText}
        />
    );

    const renderSend = (props) => (
        <Send {...props} containerStyle={styles(theme).sendButtonContainer}>
            <MaterialIcons name="send" size={28} color="#fff" />
        </Send>
    );

    const renderBubble = (props) => (
        <Bubble
            {...props}
            wrapperStyle={{
                right: { backgroundColor: theme.primary, borderRadius: 15, padding: 12 },
                left: { backgroundColor: theme.white, borderRadius: 15, padding: 12 },
            }}
            textStyle={{
                right: { color: theme.white, fontWeight: '600' },
                left: { color: theme.black, fontWeight: '400' },
            }}
            renderName={(message) => (
                <Text style={styles(theme).messageUserName}>
                    {message.user.name}
                </Text>
            )}
            renderAvatar={(props) => (
                <View style={styles(theme).avatarContainer}>
                    <Image source={{ uri: props.currentMessage.user.avatar }} style={styles(theme).avatarImage} />
                </View>
            )}
            onLongPress={() => {
                Alert.alert(
                    'Excluir Mensagem',
                    'Deseja excluir esta mensagem?',
                    [
                        { text: 'Cancelar', style: 'cancel' },
                        { text: 'Excluir', onPress: () => deleteMessage(props.currentMessage._id) },
                    ]
                );
            }}
        />
    );

    return (
        <View style={styles(theme).container}>
            <GiftedChat
                messages={messages}
                onSend={handleSendMessage}
                user={{
                    _id: user.id,
                    name: user.name,
                    avatar: api.defaults.baseURL + user.profileImage,
                }}
                renderAvatarOnTop={true}  // Coloca o avatar no topo da mensagem
                renderUsernameOnMessage={true}  // Exibe o nome do usuário no topo
                renderInputToolbar={renderInputToolbar}
                renderSend={renderSend}
                renderBubble={renderBubble}
                alwaysShowSend
                placeholder="Digite sua resposta..."
                alignTop
                scrollToBottom
                scrollToBottomComponent={() => (
                    <MaterialIcons name="keyboard-arrow-down" size={24} color={theme.primary} />
                )}
                isTyping={isTyping}
                onInputTextChanged={handleTyping}
            />
        </View>
    );
}

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    inputContainer: {
        backgroundColor: '#F7F7F7',
        borderRadius: 30,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 10,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputText: {
        color: theme.text,
        fontSize: 16,
        paddingVertical: 6,
        fontFamily: 'Roboto',
        flex: 1,
        marginRight: 10,
    },
    sendButtonContainer: {
        backgroundColor: theme.primary,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 45,
        height: 45,
        shadowColor: theme.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    avatarContainer: {
        marginBottom: 5,
        marginLeft: 10,
    },
    avatarImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    messageUserName: {
        fontSize: 12,
        color: '#555',
        marginBottom: 5,
        fontWeight: 'bold',
    },
});
