import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    FlatList,
    ScrollView,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-snap-carousel';



import COLORS from '../../consts/colors';
import categories from '../../consts/categories';
import foods from '../../consts/foods';
import promoData from '../../consts/promoData';

const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

export default function Favoritos({ navigation }) {
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
    const Card = ({ food }) => {
        const [isFavorite, setIsFavorite] = useState(false);

        const toggleFavorite = () => {
            setIsFavorite(!isFavorite);
        };
        return (
            <TouchableHighlight
                underlayColor={COLORS.white}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('DetailsScreen', food)}
                style={styles.card}>
                <View>
                    <View style={styles.cardImageContainer}>
                        <Image source={food.image} style={styles.cardImage} />
                    </View>
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>{food.name}</Text>
                        <Text style={styles.cardIngredients}>{food.ingredients}</Text>
                        <View style={styles.cardFooter}>
                            <Text style={styles.cardPrice}>R${food.price}</Text>
                            <TouchableOpacity
                                style={[styles.addToCartBtn, { backgroundColor: isFavorite ? COLORS.primary : COLORS.primary }]}
                                onPress={toggleFavorite}
                            >
                                <Icon name={isFavorite ? "favorite" : "favorite-border"} size={20} color={COLORS.white} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };
    const promoData = [
        {
            id: 1,
            title: 'Promoção 1',
            image: require('../../../assets/img/fundo3.jpg'),
        },
        {
            id: 2,
            title: 'Promoção 2',
            image: require('../../../assets/img/fundo3.jpg'),
        },
        {
            id: 3,
            title: 'Promoção 3',
            image: require('../../../assets/img/fundo3.jpg'),
        },
    ];
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
    return (
        <ScrollView showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
            <View style={styles.header}>
                <View >
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 28 }}>Olá,</Text>
                        <Text style={{ fontSize: 28, fontWeight: 'bold', marginLeft: 10 }}>
                            Lucas
                        </Text>
                    </View>
                    <Text style={{ marginTop: 5, fontSize: 22, color: COLORS.grey }}>
                        O que gostaria de pedir hoje?
                    </Text>
                </View>
                <TouchableHighlight
                    underlayColor={COLORS.white}
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('Login')}>
                    <Image
                        source={require('../../../assets/catergories/person.png')} target
                        style={{ height: 50, width: 50, borderRadius: 25 }}
                    />
                </TouchableHighlight>
            </View>


            <View>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Promoções do Dia</Text>
                <PromoCarousel />
            </View>
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
                    <Icon name="tune" size={28} color={COLORS.white} />
                </View>
            </View>
            <View>
                <ListCategories />
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={foods}
                contentContainerStyle={{ alignItems: 'center' }}
                renderItem={({ item }) => <Card food={item} />}
            />
        </ScrollView>
    );
};



const styles = StyleSheet.create({
    header: {
        paddingBottom: 20,
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        // backgroundColor: COLORS.primary,
    },
    //CARROSSEL
    carouselItem: {
        marginTop: 20,
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
    // PESQUISA

    inputContainer: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: COLORS.light,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    sortBtn: {
        width: 50,
        height: 50,
        marginLeft: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //CATEGORIAS
    categoriesListContainer: {
        paddingVertical: 30,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    categoryBtn: {
        height: 45,
        width: 120,
        marginRight: 7,
        borderRadius: 30,
        alignItems: 'center',
        paddingHorizontal: 5,
        flexDirection: 'row',
    },
    categoryBtnImgCon: {
        height: 35,
        width: 35,
        backgroundColor: COLORS.white,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //CARDS
    card: {
        width: cardWidth,
        marginHorizontal: 5,
        marginBottom: 10,
        // marginTop: 50,
        borderRadius: 15,
        elevation: 13,
        backgroundColor: COLORS.white,
        paddingBottom: 30,
        alignItems: 'center',  // Centraliza horizontalmente
    },
    cardImageContainer: {
        alignItems: 'center',
        marginVertical: 30,
    },
    cardImage: {
        height: 120,
        width: 120,
    },
    cardContent: {
        marginHorizontal: 20,
        alignItems: 'center',  // Centraliza horizontalmente
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardIngredients: {
        fontSize: 14,
        color: COLORS.grey,
        marginTop: 2,
    },
    cardFooter: {
        marginTop: 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',  // Centraliza horizontalmente
    },
    cardPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    addToCartBtn: {
        marginLeft: 10,
        height: 40,
        width: 40,
        borderRadius: 100,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

