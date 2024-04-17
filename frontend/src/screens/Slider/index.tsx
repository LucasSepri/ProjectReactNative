import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import  COLORS  from '../../styles/COLORS';

const slides = [
  {
    key: 1,
    title: 'Pizza de Queijo Deliciosa',
    text: 'Explore a riqueza da nossa clássica pizza de queijo, feita com os melhores ingredientes.',
    image: require('../../assets/catergories/meatPizza.png'),
    backgroundColor: ['#ffcc00', '#ff9900'],
  },
  {
    key: 2,
    title: 'Entrega Rápida',
    text: 'Receba sua pizza favorita entregue quente e fresca na sua porta em pouco tempo.',
    image: require('../../assets/catergories/sushiMakizushi.png'),
    backgroundColor: ['#ff9900', '#ff6600'],
  },
  {
    key: 3,
    title: 'Ofertas Especiais',
    text: 'Não perca ofertas exclusivas e descontos. Peça agora e economize!',
    image: require('../../assets/catergories/cheesePizza.png'),
    backgroundColor: [COLORS.primary, '#ffcc00'],
  },
];

export default function Slider({ navigation }) {
  const renderSlides = ({ item, index }) => {
    return (
      <View style={[styles.slideContainer, { backgroundColor: item.backgroundColor[0] }]}>
        <Image
          source={item.image}
          style={styles.slideImage}
        />

        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.text}</Text>
        </View>

        {index === slides.length - 1 && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.signUpButton}>
              <Text style={styles.buttonText}>Cadastre-se Já</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.skipLink}>
              <Text style={styles.linkText}>Continuar sem cadastro</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AppIntroSlider
        renderItem={renderSlides}
        data={slides}
        activeDotStyle={styles.activeDot}
        dotStyle={styles.dot}
        onDone={() => { navigation.navigate('Home') }}
        doneLabel="Concluído"
        nextLabel="Próximo"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 60,
    // borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  slideImage: {
    resizeMode: 'contain',
    height: 300,
    width: '80%',
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: '#ee8238',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipLink: {},
  linkText: {
    color: '#fff',
    fontSize: 16,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 30,
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: 20,
  },
});
