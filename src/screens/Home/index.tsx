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
  TextInput,
  Button

} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';

// Importe de Estilos
import styles from './style';
import COLORS from '../../styles/COLORS';


// impotes de Dados
import promoData from '../../context/promoData';
import foodsData from '../../context/foods';
import categories from '../../context/categories';


const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPeididoVisible, setModalPeididoVisible] = useState(false);

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


  // Categorias
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}>
            <View
              style={{
                backgroundColor:
                  selectedCategoryIndex == index
                    ? COLORS.primary
                    : COLORS.secondary,
                ...styles.categoryBtn,
              }}>
              <View style={styles.categoryBtnImgCon}>
                <Image
                  source={category.image}
                  style={{ height: 35, width: 35, resizeMode: 'cover' }}
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  color:
                    selectedCategoryIndex == index
                      ? COLORS.white
                      : COLORS.primary,
                }}>
                {category.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };



  //Modal Horarios 
  const ModalPeidido = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPeididoVisible}
        onRequestClose={() => {
          setModalPeididoVisible(false);
        }
        }
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitulo}>Selecione os Adicionais</Text>
          <Button title="Fechar" onPress={closeAdicionaisModal} />
        </View>
      </Modal >
    );
  };

  const openAdicionaisModal = () => {
    setModalPeididoVisible(true);
  };
  const closeAdicionaisModal = () => { setModalPeididoVisible(false) };


  const Card = ({ foodsData }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
      setIsFavorite(!isFavorite);
    };

    return (
      <View style={styles.card}>

        <TouchableOpacity
          style={[styles.favoritoButton]}
          onPress={toggleFavorite}
        >
          <View style={styles.favoritoButtonContainer}>
            <Icon name={isFavorite ? "heart" : "heart-outline"} size={20} color={COLORS.white} />
          </View>

        </TouchableOpacity >

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

        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.adicionarButton} onPress={openAdicionaisModal}>
            <Icon name="add-circle-outline" size={32} color="blue" style={styles.adicionarIcon} />
            <Text style={styles.adicionarButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View >
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

      {/* Barra de Pesquisa */}
      <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <View style={styles.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{ flex: 1, fontSize: 18 }}
            placeholder="Busque aqui"
          />
        </View>
        <View style={styles.sortBtn}>
          <Icon name="search" size={28} color={COLORS.white} />
        </View>
      </View>


      {/* Categorias */}
      <View>
        <ListCategories />
      </View>


      {/* Produtos */}
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={foodsData}
        contentContainerStyle={{ alignItems: 'center' }}
        renderItem={({ item }) => <Card foodsData={item} />}
      />



      {/* Modal de Seleção de Adicionais */}
      <ModalPeidido />


      {/* Modal referente ao Horarios de Funcionamento */}
      <ModalExibir />
    </ScrollView>
  );
}

