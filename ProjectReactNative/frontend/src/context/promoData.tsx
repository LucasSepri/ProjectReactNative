import { ImageSourcePropType } from 'react-native';

export interface PromoItem {
  id: number;
  title: string;
  image: ImageSourcePropType; // Importe o tipo correto para a propriedade 'image'
}

const promoData: PromoItem[] = [
  {
    id: 1,
    title: 'Promoção 1',
    image: require('../assets/img/fundo3.jpg'),
  },
  {
    id: 2,
    title: 'Promoção 2',
    image: require('../assets/img/fundo3.jpg'),
  },
  {
    id: 3,
    title: 'Promoção 3',
    image: require('../assets/img/fundo3.jpg'),
  },
  {
    id: 4,
    title: 'Promoção 4',
    image: require('../assets/img/fundo3.jpg'),
  },
];

export default promoData;
