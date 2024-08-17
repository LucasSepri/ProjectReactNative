import { StyleSheet } from "react-native";
import {COLORS} from '../../styles/COLORS';

const styles = StyleSheet.create({
    //CARROSSEL
    ContainerCarousel: {
        marginVertical: 10,
    },
    textoTituloPromocoes: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    carouselItem: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    carouselImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    carouselTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
        backgroundColor: COLORS.primary,
        color: 'white',
    },
});

export default styles;