import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import socket from '../../services/socket';
import { AuthContext } from '../../context/AuthContext';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { useFocusEffect } from '@react-navigation/native';
import { ThemeContext } from 'styled-components';
import { api } from '../../services/api';

export default function ChatScreen() {
  const theme = useContext(ThemeContext);
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user.id) {
      socket.emit('getMessages', null, user.id);
    }
    if (!user.id) {
      setMessages([]);
    }

    socket.on('loadMessages', (messages) => {
      const formattedMessages = messages.map(msg => ({
        _id: msg.id,
        text: msg.content,
        createdAt: new Date(msg.timestamp),
        user: {
          _id: msg.senderId === user.id ? user.id : 2,
          name: msg.senderId === user.id ? 'Você' : 'Admin',
        }
      }));
      setMessages(formattedMessages);
    });

    socket.on('receiveMessage', (message) => {
      const formattedMessage = {
        _id: message.id,
        text: message.content,
        createdAt: new Date(message.timestamp),
        user: {
          _id: message.senderId === user.id ? user.id : 2,
          name: message.senderId === user.id ? 'Você' : 'Admin',
          avatar: api.defaults.baseURL + message.sender.profileImage,
        }
      };
      setMessages((prevMessages) => [formattedMessage, ...prevMessages]);
    });

    // Ouvinte para deletar mensagens
    socket.on('messageDeleted', ({ messageId }) => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId)
      );
    });

    return () => {
      socket.off('loadMessages');
      socket.off('receiveMessage');
      socket.off('messageDeleted');
    };
  }, [user.id]);

  useFocusEffect(
    React.useCallback(() => {
      if (user.id) {
        console.log('Solicitando mensagens para o usuário:', user.id);
        socket.emit('getMessages', null, user.id);
      }
      if (!user.id) {
        setMessages([]);
      }
      socket.on('loadMessages', (messages) => {
        console.log('Mensagens carregadas:', messages);
        const formattedMessages = messages.map(msg => ({
          _id: msg.id,
          text: msg.content,
          createdAt: new Date(msg.timestamp),
          user: {
            _id: msg.senderId === user.id ? user.id : 2,
            name: msg.senderId === user.id ? 'Você' : 'Admin',
            avatar: api.defaults.baseURL + msg.sender.profileImage,
          }
        }));
        setMessages(formattedMessages);
      });
    }, [user.id])
  );

  const handleSendMessage = (newMessages = []) => {
    if (newMessages.length > 0) {
      const newMessage = newMessages[0];
      if (user.id) {
        socket.emit('sendMessage', { content: newMessage.text, userId: user.id });
      } else {
        console.log('Logue para enviar mensagens');
      }
    }
  };


  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: theme.primary,
        },
        left: {
          backgroundColor: theme.white,
        },
      }}
      textStyle={{
        right: {
          color: theme.white,
        },
        left: {
          color: theme.black,
        },
      }}
    />
  );

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).title}>Atendimento Online</Text>
      <GiftedChat
        messages={messages}
        onSend={handleSendMessage}
        user={{
          _id: user.id,
        }}
        renderUsernameOnMessage={true}
        placeholder="Digite sua resposta..."
        keyboardShouldPersistTaps="handled"
        bottomOffset={90}
        renderBubble={renderBubble}
        showUserAvatar={true}
      />
    </View>
  );
}

const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 90,
  },
  title: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.white,
    backgroundColor: theme.primary,
    textTransform: 'uppercase',
  },
});
