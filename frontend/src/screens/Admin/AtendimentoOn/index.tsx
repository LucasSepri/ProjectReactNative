import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, RefreshControl, Image, TouchableOpacity } from 'react-native';
import socket from '../../../services/socket';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../../../services/api';
import { AuthContext } from '../../../context/AuthContext';

export default function AdminChatsScreen({ navigation }) {
  const [chats, setChats] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { user } = useContext(AuthContext);

  const loadChats = () => {
    socket.emit('getAllChats', user.id);
  };

  useEffect(() => {
    socket.on('loadAllChats', (loadedChats) => {
      setChats(loadedChats);
      setIsRefreshing(false); // Para de mostrar o refresh
    });

    socket.on('chatDeleted', (deletedChatId) => {
      loadChats();
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== deletedChatId));
    });

    return () => {
      socket.off('loadAllChats');
      socket.off('chatDeleted');
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      socket.on('receiveMessage', () => {
        loadChats(); // Recarregar chats sempre que uma nova mensagem for recebida
      });
      loadChats(); // Carregar chats ao focar na tela
      return () => {
        socket.off('receiveMessage');
      };
    }, [])
  );

  const handleChatPress = (chatId) => {
    navigation.navigate('ChatAtendimento', { chatId });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadChats();
  };

  const handleDeleteChat = (chatId, chatUserId) => {
    socket.emit('deleteChat', { chatId, userId: user.id, chatUserId });
  };


  const renderItem = ({ item }) => (
    <View style={styles.chatItem}>
      <Image
        source={{ uri: api.defaults.baseURL + item.users[0].profileImage }}
        style={styles.profileImage}
      />
      <View style={styles.chatInfo}>
        <Text style={styles.chatText}>
          {item.users.map(user => user.name).join(', ')}
        </Text>
        <Text style={styles.unreadCount}>
          {item.unreadCount > 0 ? `${item.unreadCount} mensagens novas` : 'Sem novas mensagens'}
        </Text>
        <View style={styles.buttons}>
          <Button title="Responder" onPress={() => handleChatPress(item.id)} />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteChat(item.id, item.users.map(user => user.id))}
          >
            <Text style={styles.deleteText}>Deletar Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats</Text>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  list: {
    paddingBottom: 20,
  },
  chatItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatInfo: {
    flex: 1,
    marginLeft: 15,
  },
  chatText: {
    fontSize: 16,
    color: '#555',
  },
  unreadCount: {
    fontSize: 14,
    color: '#e74c3c', // Cor para destacar as mensagens novas
    marginTop: 5,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: '#e74c3c',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteText: {
    color: '#fff',
    fontSize: 14,
  },
});
