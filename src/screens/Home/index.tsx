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
  Dimensions,
  FlatList,
  TouchableHighlight,

} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';

// Importe de Estilos
import styles from './style';
import COLORS from '../../styles/COLORS';


// impotes de Dados
import promoData from '../../context/promoData';
import foodsData from '../../context/foodsData';


const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePhoneNumberPress = () => {
    const phoneNumber = '123456789'; // Coloque o número de telefone desejado aqui
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const showOpeningHours = () => {
    setModalVisible(true);
  };



  //Modal Horarios 
  const ModalExibir = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }
        }
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Horário de Funcionamento:</Text>
            <Text>Segunda: 21:00 - 23:30</Text>
            <Text>Terça: 21:00 - 23:30</Text>
            <Text>Quarta: 21:00 - 23:30</Text>
            <Text>Quinta: 21:00 - 23:30</Text>
            <Text>Sexta: 21:00 - 23:30</Text>
            <Text>Sábado: 21:00 - 23:30</Text>
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal >
    );
  };
  // Carrocel 
  const PromoCarousel = () => {
    const renderPromoItem = ({ item }) => (
      <View style={styles.carouselItem}>
        <Image source={item.image} style={styles.carouselImage} />
        <Text style={styles.carouselTitle}>{item.title}</Text>
      </View>
    );
    return (
      <Carousel
        data={promoData}
        renderItem={renderPromoItem}
        sliderWidth={width}
        itemWidth={300}
        autoplay
        loop
      />
    );
  };




  const Card = ({ foodsData }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
      setIsFavorite(!isFavorite);
    };
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        style={styles.card}>
        <View>
          <View style={styles.cardImageContainer}>
            <Image source={foodsData.image} style={styles.cardImage} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{foodsData.name}</Text>
            <Text style={styles.cardIngredients}>{foodsData.ingredients}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardPrice}>R${foodsData.price}</Text>
              <TouchableOpacity
                style={[styles.addToCartBtn, { backgroundColor: isFavorite ? COLORS.primary : COLORS.primary }]}
                onPress={toggleFavorite}
              >
                <Icon name={isFavorite ? "heart" : "heart-outline"} size={20} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };


  // Rederizar pagina
  return (
    <ScrollView>

      {/*-------------------- Header -----------------------*/}
      <ImageBackground
        source={require('../../assets/background.jpg')}
        style={styles.header}
        resizeMode="cover">
        {/* Logo da pizzaria */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />
        </View>

        {/* Botão Telefone */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonWhatsApp} onPress={handlePhoneNumberPress}>
            <Icon name="logo-whatsapp" size={20} color="#fff" />
            <Text style={styles.buttonText}>Telefone</Text>
          </TouchableOpacity>

          {/* Botão Horários de Funcionamento */}
          <TouchableOpacity style={styles.button} onPress={showOpeningHours}>
            <Icon name="time" size={20} color="#fff" />
            <Text style={styles.buttonText}>Horários de Funcionamento</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.addressText}>Endereço: Rua das Pizzas, 123</Text>
      </ImageBackground>

      {/*-------------------- Main -----------------------*/}
      <View style={styles.ContainerCarousel}>
        <Text style={styles.textoTituloPromocoes}>PROMOÇÕES</Text>
        <PromoCarousel />
      </View>


      {/* Produtos */}
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={foodsData}
        contentContainerStyle={{ alignItems: 'center' }}
        renderItem={({ item }) => <Card foodsData={item} />}
      />




      {/* Modal referente ao Horarios de Funcionamento */}
      <ModalExibir />
    </ScrollView>
  );
}
