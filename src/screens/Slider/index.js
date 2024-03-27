import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: 1,
    title: 'Delicious Cheese Pizza',
    text: 'Explore the richness of our classic cheese pizza, made with the finest ingredients.',
    image: require('../../assets/catergories/meatPizza.png'),
    backgroundColor: '#ffcc00',
  },
  {
    key: 2,
    title: 'Fast Delivery',
    text: 'Get your favorite pizza delivered hot and fresh to your doorstep in no time.',
    image: require('../../assets/catergories/sushiMakizushi.png'),
    backgroundColor: '#ff9900',
  },
  {
    key: 3,
    title: 'Special Offers',
    text: 'Don\'t miss out on exclusive deals and discounts. Order now and save!',
    image: require('../../assets/catergories/cheesePizza.png'),
    backgroundColor: '#ff6600',
  },
];

export default function Slider({ navigation }) {
  const renderSlides = ({ item, index }) => {
    return (
      <View style={styles.slideContainer}>
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
        onDone={() => { navigation.navigate('Home') }}
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
    justifyContent: 'center',
    backgroundColor: 'white', // Change this to your background color
  },
  slideImage: {
    resizeMode: 'cover',
    height: 400,
    width: 400,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: '#ee8238',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipLink: {
    marginBottom: 20,
  },
  linkText: {
    color: '#007BFF', // Change this to your preferred link color
    fontSize: 16,
  },
  activeDot: {
    backgroundColor: '#ffcc00',
    width: 30,
  },
});
