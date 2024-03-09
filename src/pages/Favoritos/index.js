import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions, ImageBackground, TextInput, TouchableOpacity, Image } from "react-native";
import Carousel from "react-native-snap-carousel";

import Icon from 'react-native-vector-icons/Ionicons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function Favoritos({ navigation }) {
    const carouselRef = useRef(null);


    const [lista, setLista] = useState([
        {
            title: "O Justiceiro",
            text: "Após o assassinato de sua família, Frank Castle está traumatizado e sendo caçado. No submundo do crime, ele se tornará aquele conhecido como O Justiceiro",
            release: 2018,
            img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/background.jpg'
        },
        {
            title: "Bad Boys for life",
            text: "Terceiro episódio das histórias dos policiais Burnett (Martin Lawrence) e Lowrey (Will Smith), que devem encontrar e prender os mais perigosos traficantes de drogas da cidade.",
            release: 2020,
            img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/badboy.jpg'
        },
        {
            title: "Viúva Negra",
            text: "Em Viúva Negra, após seu nascimento, Natasha Romanoff (Scarlett Johansson) é dada à KGB, que a prepara para se tornar sua agente definitiva.",
            release: 2020,
            img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/blackwidow.jpg'
        },
        {
            title: "Top Gun: MAVERICK",
            text: "Em Top Gun: Maverick, depois de mais de 30 anos de serviço como um dos principais aviadores da Marinha, o piloto à moda antiga Maverick (Tom Cruise) enfrenta drones e prova que o fator humano ainda é fundamental no mundo contemporâneo das guerras tecnológicas.",
            release: 2020,
            img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/topgun.jpeg'
        },
        {
            title: "BloodShot",
            text: "Bloodshot é um ex-soldado com poderes especiais: o de regeneração e a capacidade de se metamorfosear. ",
            release: 2020,
            img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/blood.jpg'
        },
        {
            title: "Free Guy",
            text: "Um caixa de banco preso a uma entediante rotina tem sua vida virada de cabeça para baixo quando ele descobre que é personagem em um brutalmente realista vídeo game de mundo aberto.",
            release: 2020,
            img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/freeguy.jpg'
        },
    ]);

    const [background, setBeckground] = useState(lista[0].img);

    const [activeIndex, setActiveIndex] = useState(0);

    const _renderItem = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity>
                    <Image
                        source={{ uri: item.img }}
                        style={styles.carouselImg}
                    />
                    <Text style={styles.carouselText}>{item.title}</Text>
                    <Icon
                        name="play-circle-outline"
                        size={30}
                        color="#FFF"
                        style={styles.carouselIcon}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{ flex: 1, height: screenHeight }}>
                <View style={{ ...StyleSheet.absoluteFill, backgroundColor: '#000' }}>
                    <ImageBackground
                        source={{ uri: background }}
                        style={styles.imgBg}
                        blurRadius={8}
                    >

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
                                    placeholder="Procurando algo?"
                                />
                            </View>
                        </View>

                        <Text
                            style={{ color: '#FFF', fontSize: 25, marginLeft: 10, marginVertical: 10 }}
                        >
                            Acabou de Chegar
                        </Text>

                        <View style={styles.slideView}>
                            <Carousel
                                style={styles.carousel}
                                ref={carouselRef}
                                data={lista}
                                renderItem={_renderItem}
                                sliderWidth={screenWidth}
                                itemWidth={200}
                                inactiveSlideOpacity={0.5}
                                onSnapToItem={(index) => {
                                    setBeckground(lista[index].img);
                                    setActiveIndex(index);
                                }}
                                autoplay
                                loop
                            />
                        </View>

                        <View style={styles.moreInfo}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.movieTitle}>{lista[activeIndex].title}</Text>
                                <Text style={styles.movieDesc}>{lista[activeIndex].text}</Text>
                            </View>
                            <TouchableOpacity style={{ marginRight: 15, marginTop: 10 }}>
                                <Icon name="albums-outline" color="#131313" size={30} />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        // marginTop: 40,
        flex: 1,
    },
    imgBg: {
        flex: 1,
        width: null,
        height: null,
        opacity: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#000',
    },

    inputContainer: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    slideView: {
        width: '100%',
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',

    },
    carousel: {
        flex: 1,
        overflow: 'visible',
    },
    carouselImg: {
        alignSelf: 'center',
        width: 200,
        height: 300,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    carouselText: {
        padding: 15,
        color: '#FFF',
        bottom: 0,
        left: 2,
        fontWeight: 'bold',
    },

    carouselIcon: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
    moreInfo: {
        backgroundColor: "#FFF",
        width: screenWidth,
        height: screenHeight,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    movieTitle: {
        paddingLeft: 15,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#131313',
        marginBottom: 5,
    },
    movieDesc: {
        paddingLeft: 15,
        color: '#131313',
        fontSize: 14,
        fontWeight: 'bold',

    }
});
