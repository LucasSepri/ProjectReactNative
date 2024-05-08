import { TouchableOpacity,View, Dimensions, Image, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';

// Importe de Estilos
import styles from './style';

// impotes de Dados
const promoData = [
  {
    id: 1,
    title: 'Promoção 1',
    image: require('../../assets/img/fundo3.jpg'),
  },
  {
    id: 2,
    title: 'Promoção 2',
    image: require('../../assets/img/fundo3.jpg'),
  },
  {
    id: 3,
    title: 'Promoção 3',
    image: require('../../assets/img/fundo3.jpg'),
  },
  {
    id: 4,
    title: 'Promoção 4',
    image: require('../../assets/img/fundo3.jpg'),
  },
];


const { width } = Dimensions.get('screen');

// Carrocel 
const PromoCarousel = () => {
  // Função para renderizar cada item do carousel
  const renderPromoItem = ({ item }) => (
    <TouchableOpacity style={styles.carouselItem}>
      <Image source={item.image} style={styles.carouselImage} />
      <Text style={styles.carouselTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.ContainerCarousel}>
      <Text style={styles.textoTituloPromocoes}>PROMOÇÕES</Text>
      <Carousel
        data={promoData}
        renderItem={renderPromoItem}
        sliderWidth={width} // Defina a largura do slider conforme necessário
        itemWidth={300} // Defina a largura do item conforme necessário
        autoplay
        loop
        vertical={false} // Adicione a propriedade 'vertical' e defina-a como 'false'
      />
    </View>
  );
};

export default PromoCarousel;