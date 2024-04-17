import { View, Dimensions, Image, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';

// Importe de Estilos
import styles from './style';

// impotes de Dados
import promoData from '../../context/promoData';


const { width } = Dimensions.get('screen');

// Carrocel 
const PromoCarousel = () => {
  // Função para renderizar cada item do carousel
  const renderPromoItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={item.image} style={styles.carouselImage} />
      <Text style={styles.carouselTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.ContainerCarousel}>
      <Text style={styles.textoTituloPromocoes}>PROMOÇÕES</Text>
        <Carousel
          data={promoData}
          renderItem={renderPromoItem}
          sliderWidth={width} // Defina a largura do slider conforme necessário
          itemWidth={350} // Defina a largura do item conforme necessário
          autoplay
          loop
          vertical={false} // Adicione a propriedade 'vertical' e defina-a como 'false'
        />
    </View>
  );
};

export default PromoCarousel;