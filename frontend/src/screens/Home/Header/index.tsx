import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, Linking, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Header.style';
import { DefaultProfileImage } from '../../../components/Profile';
import socket from '../../../services/socket';
import { api } from '../../../services/api';
import { DefaultLogoImage } from '../../../components/Logo';
import { useTable } from '../../../context/TableContext';
import { ThemeContext } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../routes/app.routes';

type NavigationProp = NativeStackNavigationProp<StackParamList>;

interface HeaderProps {
  isAuthenticated: boolean;
  user: any;
}

export const Header: React.FC<HeaderProps> = ({ isAuthenticated, user }) => {
  const theme = useContext(ThemeContext);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
  const [storeSettings, setStoreSettings] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { tableNumber, clearTable } = useTable();
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const loadStoreSettings = async () => {
    try {
      const response = await api.get('/store-settings');
      setStoreSettings(response.data);
    } catch (error) {
      setStoreSettings([]);
    }
  };

  useEffect(() => {
    if (storeSettings?.openingHours) {
      setIsOpen(isStoreOpen(storeSettings.openingHours));
    }
  }, [storeSettings]);

  useEffect(() => {
    socket.on('lojaAtualizada', () => {
      loadStoreSettings();
    });
    loadStoreSettings();
    return () => {
      socket.off('lojaAtualizada');
    };
  }, []);

  const isStoreOpen = (openingHours: string) => {
    const hours = JSON.parse(openingHours);
    const currentDay = new Date().toLocaleString('pt-br', { weekday: 'long' }).toLowerCase();
    const currentTime = new Date().getHours() * 60 + new Date().getMinutes();

    const { open, close } = hours[currentDay] || {};

    if (open && close) {
      const openMinutes = timeToMinutes(open);
      const closeMinutes = timeToMinutes(close);

      if (closeMinutes < openMinutes) {
        return currentTime >= openMinutes || currentTime < closeMinutes;
      }
      return currentTime >= openMinutes && currentTime < closeMinutes;
    }

    return false;
  };

  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const formatHours = (openingHours: string) => {
    const hours = JSON.parse(openingHours);

    if (Object.keys(hours).length === 0) {
      return ["Nenhum horário cadastrado"];
    }

    return Object.keys(hours).map((day) => {
      const open = hours[day].open || "Não cadastrado";
      const close = hours[day].close || "Não cadastrado";
      return `${translateDay(day)}: ${open} - ${close}`;
    });
  };

  const translateDay = (day: string) => {
    const daysTranslation: { [key: string]: string } = {
      monday: 'Segunda-feira',
      tuesday: 'Terça-feira',
      wednesday: 'Quarta-feira',
      thursday: 'Quinta-feira',
      friday: 'Sexta-feira',
      saturday: 'Sábado',
      sunday: 'Domingo',
    };
    return daysTranslation[day] || day;
  };

  const StoreSettingsModal = ({ visible, onClose, storeSettings }: any) => {
    const [hours, setHours] = useState<string[]>([]);

    useEffect(() => {
      if (storeSettings?.openingHours) {
        setHours(formatHours(storeSettings.openingHours));
      } else {
        setHours(["Nenhum horário cadastrado"]);
      }
    }, [storeSettings]);

    return (
      <Modal
        visible={visible}
        onRequestClose={onClose}
        animationType="fade"
        transparent
      >
        <View style={styles(theme).overlay}>
          <View style={styles(theme).modalContainer}>
            <View style={styles(theme).header}>
              <Text style={styles(theme).modalTitle}>Horários de Funcionamento</Text>
            </View>
            <View style={styles(theme).hoursContainer}>
              {hours.map((hour, index) => (
                <Text key={index} style={styles(theme).hourText}>{hour}</Text>
              ))}
            </View>
            <TouchableOpacity style={styles(theme).closeButton} onPress={onClose}>
              <Text style={styles(theme).closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <ImageBackground
      source={storeSettings?.background && !imageError[storeSettings.id] ? { uri: `${api.defaults.baseURL}/uploads/${storeSettings?.background}` } : require('../../../assets/img/background.jpg')}
      onError={() => setImageError(prev => ({ ...prev, [storeSettings.id]: true }))}
      style={styles(theme).headerImage}
      blurRadius={2}
    >
      <View style={styles(theme).headerIconsContainer}>
        {isAuthenticated ? (
          <TouchableOpacity style={styles(theme).profileButton} onPress={() => navigation.navigate('Perfil')}>
            {user.profileImage && !imageError[user.id] ? (
              <Image source={{ uri: `${api.defaults.baseURL}${user.profileImage}?t=${new Date().getTime()}` }}
                onError={() => setImageError(prev => ({ ...prev, [user.id]: true }))}
                style={styles(theme).profileImage} />
            ) : (
              <DefaultProfileImage style={styles(theme).profileImage} theme={theme} />
            )}
            <Text style={styles(theme).profileName}>
              {user.name.split(' ')[0].toUpperCase()}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles(theme).EntrarButton} onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles(theme).loginText}>ENTRAR</Text>
          </TouchableOpacity>
        )}

        {tableNumber ? (
          <TouchableOpacity style={styles(theme).tableExitButton} onPress={clearTable}>
            <Text style={styles(theme).tableExitText}>MESA {tableNumber}</Text>
            <Icon name="exit-outline" style={styles(theme).exitIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles(theme).EntrarButton} onPress={() => navigation.navigate('Qrcode')}>
            {theme && <Icon name="qr-code-outline" size={30} color={theme.white} />}
          </TouchableOpacity>
        )}
      </View>

      {storeSettings && (
        <>
          {storeSettings?.logo && !imageError[storeSettings.id] ? (
            <Image
              source={{ uri: `${api.defaults.baseURL}/uploads/${storeSettings.logo}` }}
              onError={() => setImageError(prev => ({ ...prev, [storeSettings.id]: true }))}
              style={styles(theme).logo}
            />
          ) : (
            <DefaultLogoImage style={styles(theme).logo} theme={theme} />
          )}
          {storeSettings?.storeName && (
            <Text style={styles(theme).title}>{storeSettings.storeName || 'Nome da loja'}</Text>
          )}

          <View style={styles(theme).buttonContainer}>
            <View style={styles(theme).buttonSeparator}>
              {storeSettings?.phone && (
                <TouchableOpacity style={styles(theme).whatsAppButton} onPress={() => Linking.openURL(`whatsapp://send?phone=${storeSettings.phone}`)}>
                  {theme && <Icon name="logo-whatsapp" size={22} color={theme.white} />}
                  <Text style={styles(theme).buttonText}>{storeSettings.phone}</Text>
                </TouchableOpacity>
              )}
              {storeSettings?.openingHours && storeSettings.openingHours !== '{"monday":{"open":"","close":""},"tuesday":{"open":"","close":""},"wednesday":{"open":"","close":""},"thursday":{"open":"","close":""},"friday":{"open":"","close":""},"saturday":{"open":"","close":""},"sunday":{"open":"","close":""}}' && (
                <TouchableOpacity style={styles(theme).hoursButton} onPress={() => setModalVisible(true)}>
                  {theme && <Icon name="time-outline" size={22} color={theme.white} />}
                  <Text style={styles(theme).buttonText}>
                    {isOpen ? 'Aberto' : 'Fechado'}
                  </Text>
                </TouchableOpacity>
              )}
              {storeSettings && (
                <StoreSettingsModal
                  visible={isModalVisible}
                  onClose={() => setModalVisible(false)}
                  storeSettings={storeSettings}
                />
              )}
            </View>

            {storeSettings?.address && (
              <TouchableOpacity style={styles(theme).locationButton} onPress={() => Linking.openURL(`https://www.google.com/maps?q=${storeSettings.address}`)}>
                {theme && <Icon name="location-outline" size={22} color={theme.white} />}
                <Text style={styles(theme).buttonText}>{storeSettings.address}</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </ImageBackground>
  );
};
