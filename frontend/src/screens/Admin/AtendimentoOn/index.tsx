import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, RefreshControl, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import socket from '../../../services/socket';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../../../services/api';
import { AuthContext } from '../../../context/AuthContext';
import { DefaultProfileImage } from '../../../components/Profile';
import styles from './style';
import { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AdminChatsScreen({ navigation }) {
  const theme = useTheme() as {
    primary: string;
    secondary: string;
    border: string;
    background: string;
    text: string;
    white: string;
    danger: string;
  };
  const [chats, setChats] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { user } = useContext(AuthContext);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
  const [loadingDelete, setLoadingDelete] = useState<{ [key: string]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState('');

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
      setLoadingDelete((prevState) => ({ ...prevState, [deletedChatId]: false }));
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
    setLoadingDelete(prevState => ({ ...prevState, [chatId]: true }));
    socket.emit('deleteChat', { chatId, userId: user.id, chatUserId });
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const filteredChats = chats.filter(chat =>
    chat.users.some(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles(theme).chatItem} onPress={() => handleChatPress(item.id)}>

      {item.users[0] && !imageError[item.id] ? (
        <Image
          source={{ uri: `${api.defaults.baseURL + item.users[0].profileImage}?t=${new Date().getTime()}` }}
          onError={() => setImageError(prevState => ({ ...prevState, [item.id]: true }))}
          style={styles(theme).profileImage}
        />
      ) : (
        <DefaultProfileImage style={styles(theme).profileImage} theme={theme} />
      )}

      <View style={styles(theme).chatInfo}>
        <Text style={styles(theme).chatText}>
          {item.users.map(user => user.name).join(', ')}
        </Text>
        {item.unreadCount > 0 && (
          <Text style={styles(theme).unreadCount}>
            {item.unreadCount} mensagens novas
          </Text>
        )}
      </View>

      {loadingDelete[item.id] ? (
        <View style={styles(theme).deleteButton}>
          <ActivityIndicator size="small" color={theme && theme.white} />
        </View>
      ) : (
        <TouchableOpacity style={styles(theme).deleteButton} onPress={() => handleDeleteChat(item.id, item.users.map(user => user.id))}>
          <Icon name="trash" size={20} color={theme && theme.white} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).searchContainer}>
        <Icon name="search" size={24} color={theme && theme.primary} style={styles(theme).searchIcon} />
        <TextInput
          style={styles(theme).searchInput}
          placeholder="Pesquisar Usuarios..."
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
      </View>

      {filteredChats.length === 0 ? (
        <View style={styles(theme).noChatsContainer}>
          <Text style={styles(theme).noChatsText}>
            Nenhum chat encontrado.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredChats}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles(theme).list}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
        />
      )}
    </View>
  );
}
