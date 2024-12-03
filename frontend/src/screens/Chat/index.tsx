import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Alert, Image } from 'react-native';
import socket from '../../services/socket';
import { AuthContext } from '../../context/AuthContext';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components';
import { api } from '../../services/api';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';

type NavigationProp = NativeStackNavigationProp<StackParamList>;

export default function ChatScreen() {
  const navigation = useNavigation<NavigationProp>();
  const theme = useContext(ThemeContext);
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user.id) {
      socket.emit('getMessages', { userId: user.id });
    }
  
    socket.on('loadMessages', (messages, chatId) => {
      setMessages([]);
      const formattedMessages = messages.map((msg) => ({
        _id: msg.id,
        text: msg.content,
        createdAt: new Date(msg.timestamp),
        user: {
          _id: msg.senderId === user.id ? user.id : 2,
          name: msg.senderId === user.id ? 'Você' : msg.sender.name,
          avatar: api.defaults.baseURL + msg.sender.profileImage,
        },
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
          name: message.senderId === user.id ? 'Você' : message.sender.name,
          avatar: api.defaults.baseURL + message.sender.profileImage,
        },
      };
      setMessages((prevMessages) => [formattedMessage, ...prevMessages]);
    });
  
    socket.on('messageDeleted', ({ messageId }) => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId)
      );
    });
  
    socket.on('chatDeleted', ({ chatId, chatUserId }) => {
      console.log('chatId', chatId);  // Verifique se o valor de chatId é o esperado
      console.log('chatUserId', chatUserId);  // Verifique se o valor de chatUserId é o esperado
      if (chatUserId.includes(user.id)) {
        setMessages([]);
        Alert.alert('Aviso', 'O chat foi encerrado pelo administrador.');
      }
    });
  
    return () => {
      socket.off('loadMessages');
      socket.off('receiveMessage');
      socket.off('messageDeleted');
      socket.off('chatDeleted');
    };
  }, [user.id, theme]);
  

  useFocusEffect(
    React.useCallback(() => {
      // console.log({messages});
      if (user.id) {
        socket.emit('getMessages', { userId: user.id });
      }
      return () => {
        socket.off('loadMessages');
      };
    }, [user.id, theme])
  );

  const handleSendMessage = (newMessages = []) => {
    if (newMessages.length > 0) {
      const newMessage = newMessages[0];
      if (user.id) {
        try {
          socket.emit('sendMessage', {
            content: newMessage.text,
            userId: user.id,
          });
        } catch (error) {
          alert('Erro ao enviar mensagem');
        }
      } else {
        Alert.alert('Aviso', 'Você precisa estar logado para enviar mensagens.', [
          { text: 'Cancelar' },
          { text: 'Login', onPress: () => navigation.navigate('SignIn') },
        ]);
      }
    }
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

    />
  );

  return (
    <View style={styles(theme).container}>
      <Text style={{
        paddingVertical: 16,
        paddingHorizontal: 8,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: theme.white,
        backgroundColor: theme.primary,
        textTransform: 'uppercase',
      }}>Atendimento Online</Text>
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
        bottomOffset={90}
        keyboardShouldPersistTaps="handled"
        scrollToBottom
        scrollToBottomComponent={() => (
          <MaterialIcons name="keyboard-arrow-down" size={24} color={theme.primary} />
        )}
      />
    </View>
  );
}

const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingBottom: 90,
  },
  inputContainer: {
    backgroundColor: '#F7F7F7',
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
    marginHorizontal: 16,
    shadowColor: theme.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    color: '#333',
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
    shadowColor: '#000',
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
