import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
  Modal,
  FlatList,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Componentes
import PromoCarousel from '../../components/Carousel/index';
import BotaoFechar from '../../components/BotaoFechar/index';
import BotaoAdicionar from '../../components/BotaoAdicionar/index';
// Estilo
import styles from './style';
import COLORS from '../../styles/COLORS';
// Context
import foods from '../../context/foods';

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);

  const openWhatsApp = async () => {
    const phoneNumber = '123456789'; // Número de telefone da pizzaria
    const url = `whatsapp://send?phone=${phoneNumber}`;

    // Verifica se o WhatsApp está disponível no dispositivo
    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      Linking.openURL(url);
    } else {
      // Se o WhatsApp não estiver disponível, abre a Play Store para baixar
      const storeUrl = Platform.select({
        ios: 'https://apps.apple.com/br/app/whatsapp-messenger/id310633997',
        android: 'https://play.google.com/store/apps/details?id=com.whatsapp',
      });

      Linking.openURL(storeUrl);
    }
  };

  const showOpeningHours = () => {
    setModalVisible(true);
  };

  const ModalExibir = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Horário de Funcionamento:</Text>
            <Text>Segunda a Sábado: 21:00 - 23:30</Text>

            <BotaoFechar setModalVisible={setModalVisible} modalVisible={modalVisible} />
          </View>
        </View>
      </Modal>
    );
  };

  const openGoogleMaps = () => {
    const address = 'Rua das Pizzas, 123'; // Endereço da pizzaria
    const url = Platform.select({
      ios: `maps://app?daddr=${address}`,
      android: `geo:0,0?q=${address}`,
    });

    Linking.openURL(url).catch(() => {
      // Caso ocorra um erro ao abrir o Google Maps, abrir a loja de aplicativos
      const storeUrl = Platform.select({
        ios: 'https://apps.apple.com/br/app/google-maps-transito-e-restaurante/id585027354',
        android: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps',
      });
      Linking.openURL(storeUrl);
    });
  };


  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filterFoodsByCategory = (category) => {
    setSelectedCategory(category);
  };

  const renderCategoryButton = (category) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === category ? styles.selectedCategoryButton : null,
      ]}
      onPress={() => filterFoodsByCategory(category)}
    >
      <Icon name="pizza" size={20} color="#FFF" />
      <Text style={styles.categoryButtonText}>{category}</Text>
    </TouchableOpacity>
  );

  const uniqueCategories = ['Todos', ...new Set(foods.map((food) => food.category))];

  const Card = ({ foodsData }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
      setIsFavorite(!isFavorite);
    };

    return (
      <View style={styles.card}>
        <TouchableOpacity style={styles.favoritoButton} onPress={toggleFavorite}>
          <View style={styles.favoritoButtonContainer}>
            <Icon name={isFavorite ? 'heart' : 'heart-outline'} size={20} color={COLORS.white} />
          </View>
        </TouchableOpacity>

        <View style={styles.cardImageContainer}>
          <Image source={foodsData.image} style={styles.cardImage} />
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{foodsData.name}</Text>
          <Text style={styles.cardIngredients}>{foodsData.ingredients}</Text>
          <View style={styles.cardFooter}>
            <Text style={styles.cardPrice}>R${foodsData.price}</Text>
          </View>
        </View>

        <BotaoAdicionar />
      </View>
    );
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={true}
      data={[
        { key: 'header', type: 'header' },
        { key: 'promo', type: 'promo' },
        { key: 'categories', type: 'categories' },
        { key: 'products', type: 'products', data: foods },
        { key: 'modalExibir', type: 'modalExibir' },
      ]}
      renderItem={({ item }) => {
        switch (item.type) {
          case 'header':
            return (
              <ImageBackground
                source={require('../../assets/background.jpg')}
                style={styles.header}
                resizeMode="cover"
              >
                <View style={styles.logoContainer}>
                  <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logo}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.buttonWhatsApp} onPress={openWhatsApp}>
                    <Icon name="logo-whatsapp" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Telefone</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={showOpeningHours}>
                    <Icon name="time" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Horários</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.addressContainer} onPress={openGoogleMaps}>
                  <Icon name="map" size={20} color="#fff" />
                  <Text style={styles.addressText}>Endereço: Rua das Pizzas, 123</Text>
                </TouchableOpacity>
              </ImageBackground>
            );
          case 'promo':
            return <PromoCarousel />;
          case 'categories':
            return (
              <View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.categoriesListContainer}
                >
                  {uniqueCategories.map((category, index) => (
                    <View key={index}>{renderCategoryButton(category)}</View>
                  ))}
                </ScrollView>
              </View>
            );
          case 'products':
            return (
              <View style={styles.containerProdutos}>
                <Text style={styles.TextContainerProdutos}>Cardápio</Text>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  data={
                    selectedCategory === 'Todos'
                      ? item.data
                      : item.data.filter((food) => food.category === selectedCategory)
                  }
                  renderItem={({ item }) => <Card foodsData={item} />}
                  contentContainerStyle={{ alignItems: 'center' }}
                />
              </View>
            );
          case 'modalExibir':
            return <ModalExibir />;
          default:
            return null;
        }
      }}
      keyExtractor={(item) => item.key}
    />
  );
}
