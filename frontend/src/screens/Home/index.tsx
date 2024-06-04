import React, { useState, useContext, useEffect, useRef } from 'react';
import {
    Text,
    TouchableOpacity,
    ImageBackground,
    View,
    Image,
    ScrollView,
    ActivityIndicator,
    Modal,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';
import { AuthContext } from '../../context/AuthContext'; // Importe o contexto de autenticação

import Icon from 'react-native-vector-icons/Ionicons';
import Carousel from '../../components/Carousel';
import ModalProduto from '../../components/ModalProdutos'
import styles from './style';
import { api } from '../../services/api';
import { COLORS } from '../../styles/COLORS';


export type CategoryProps = {
    id: string;
    name: string;
};
type ProductProps = {
    price: string;
    ingredients: string;
    description: string;
    banner: string;
    id: string;
    name: string;
}


export default function Home() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const { isAuthenticated, user } = useContext(AuthContext); // Use o contexto de autenticação

    const [category, setCategory] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps>();

    const categoryIcons = {
        'Pizzas': 'pizza',
        'Bebidas': 'beer',
        'Sobremesas': 'ice-cream',
        // Adicione mais categorias conforme necessário
    };

    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        async function loadInfo() {
            const response = await api.get('/category');
            setCategory(response.data);
            setCategorySelected(response.data[0]);
        }

        loadInfo();
    }, []);

    function handleChangeCategory(item: CategoryProps, index: number) {
        setCategorySelected(item);
        scrollViewRef.current?.scrollTo({ x: index * 150, animated: true }); // Ajuste a posição conforme necessário
    }

    const [products, setProducts] = useState<ProductProps[] | []>([]);
    const [loadingProducts, setLoadingProducts] = useState(false);

    const [productSelected, setProdctSelected] = useState<ProductProps | undefined>();
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        async function loadProduct() {
            setLoadingProducts(true);
            const response = await api.get('/category/product', {
                params: {
                    category_id: categorySelected?.id
                }
            });
            setProducts(response.data);
            setProdctSelected(response.data[0]);
            setLoadingProducts(false);
        }
        if (categorySelected) {
            loadProduct();
        }
    }, [categorySelected]);

    function handleProductPress(item: ProductProps) {
        setProdctSelected(item);
        setModalVisible(true);
    }

    function handleLogar() {
        navigation.navigate('SignIn');
    }

    function handlePerfil() {
        navigation.navigate('Perfil');
    }
    function handleQrcode() {
        navigation.navigate('Qrcode');
    }

    return (
        <ScrollView style={styles.container}>
            {/* HEADER */}
            <ImageBackground
                source={require('../../assets/background.jpg')}
                style={styles.headerImagemDeFundo}
                resizeMode="cover"
            >
                <View style={styles.perfil}>
                    {isAuthenticated ? (
                        <TouchableOpacity style={styles.botaoPerfil} onPress={handlePerfil}>
                            <Image source={{uri: `${api.defaults.baseURL}/files/${user.profileImage}`}} style={styles.perfilFoto} />
                            <Text style={styles.textoNomePerfil}>{user.name}</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.botaoPerfil} onPress={handleLogar}>
                            <Icon name="log-in-outline" style={styles.icone} />
                            <Text style={styles.textoNomePerfil}>Logar-se</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity style={styles.botaoIcone} onPress={handleQrcode}>
                        <Icon name="qr-code-outline" style={styles.icone} />
                    </TouchableOpacity>
                </View>

                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={styles.logo}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonWhatsApp} >
                        <Icon name="logo-whatsapp" size={20} color="#fff" />
                        <Text style={styles.buttonText}>Telefone</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonHorario} >
                        <Icon name="time" size={20} color="#fff" />
                        <Text style={styles.buttonText}>Horários</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.addressContainer}>
                    <TouchableOpacity style={styles.buttonAddressContainer}>
                        <Icon name="map" size={20} color="#fff" />
                        <Text style={styles.addressText}>Endereço: Rua das Pizzas, 123</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <Text style={styles.tituloContainerProdutos}>PRODUTOS</Text>

            <View style={styles.categoriasContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesListContainer}
                    ref={scrollViewRef}
                >
                    {category.map((item, index) => {
                        const iconForCategory = categoryIcons[item.name] || 'fast-food';
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.categoryButton,
                                    item.id === categorySelected?.id && styles.selectedCategoryButton,
                                ]}
                                onPress={() => handleChangeCategory(item, index)}
                            >
                                <Icon name={iconForCategory} style={styles.iconeCategorias} />
                                <Text style={styles.categoryButtonText}>{item.name}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            <View style={styles.foodListContainer}>
                {loadingProducts ? (
                    <ActivityIndicator size={60} color={COLORS.primary} />
                ) : (
                    products.map((item) => {
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.foodItem}
                                onPress={() => handleProductPress(item)}
                            >
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={{ uri: `${api.defaults.baseURL}/files/${item.banner}` }}
                                        style={styles.image}
                                    />
                                </View>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.description}>{item.description}</Text>
                                    <Text style={styles.ingredients}>{item.ingredients}</Text>
                                    <Text style={styles.price}>R$ {item.price}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                )}
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <ModalProduto productSelected={productSelected} setModalVisible={setModalVisible} />
            </Modal>
        </ScrollView >
    );
}
