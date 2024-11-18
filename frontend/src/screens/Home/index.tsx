import React, { useState, useEffect, useRef, useContext } from 'react';
import {
    Text,
    TouchableOpacity,
    ImageBackground,
    View,
    Image,
    ScrollView,
    ActivityIndicator,
    Linking,
    findNodeHandle,
    RefreshControl,
    Modal,
    Button
} from 'react-native';
import { useFocusEffect, useNavigation, useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthContext } from '../../context/AuthContext';
import { useTable } from '../../context/TableContext';
import { api } from '../../services/api';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackParamList } from '../../routes/app.routes';
import styles from './style';
import { DefaultProfileImage } from '../../components/Profile';
import { DefaultLogoImage } from '../../components/Logo';
import { ThemeContext } from 'styled-components/native';
import socket from '../../services/socket';

type CategoryProps = {
    id: string;
    name: string;
    products?: ProductProps[];
};

type ProductProps = {
    price: string;
    ingredients: string;
    description: string;
    banner: string;
    id: string;
    name: string;
};

type NavigationProp = NativeStackNavigationProp<StackParamList>;

export default function Home() {
    const theme = useContext(ThemeContext);
    const navigation = useNavigation<NavigationProp>();
    const { isAuthenticated, user, verificarUser } = useContext(AuthContext);
    const { tableNumber, clearTable } = useTable();

    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps | null>(null);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const scrollViewRef = useRef<ScrollView>(null);
    const categoryRefs = useRef<{ [key: string]: View }>({});
    const [imageError, setImageError] = useState({});
    const [initialLoad, setInitialLoad] = useState(true);
    const [storeSettings, setStoreSettings] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (storeSettings?.openingHours) {
            setIsOpen(isStoreOpen(storeSettings.openingHours));
        }
    }, [storeSettings]);

    const loadStoreSettings = async () => {
        try {
            const response = await api.get('/store-settings'); // Certifique-se de que o endpoint esteja correto
            setStoreSettings(response.data);
        } catch (error) {
            setStoreSettings([]);
            return;
            // console.error(error);
        }
    };

    useEffect(() => {
        socket.on('lojaAtualizada', () => {
            loadStoreSettings();
        });

        loadStoreSettings();
        return () => {
            socket.off('lojaAtualizada');
        }
    }, []);




    const loadCategories = async () => {
        try {
            const response = await api.get('/categories');
            const categoriesWithProducts = await Promise.all(response.data.map(async (category: CategoryProps) => {
                const productResponse = await api.get(`/products/${category.id}`);
                return { ...category, products: productResponse.data };
            }));

            // Filtra categorias que não têm produtos
            const filteredCategories = categoriesWithProducts.filter(category => category.products.length > 0);

            setCategories(filteredCategories);

            // Define a primeira categoria como aberta automaticamente, se existir
            if (filteredCategories.length > 0) {
                setCategorySelected(filteredCategories[0]);
                setExpandedCategory(filteredCategories[0]?.id);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingCategories(false);
            setRefreshing(false); // Finaliza o pull-to-refresh
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const onRefresh = () => {
        // socket.disconnect();
        // socket.connect();
        loadStoreSettings();
        setInitialLoad(true);
        setRefreshing(true);
        loadCategories();
        verificarUser();
    };

    const handleProductPress = (product: ProductProps) => {
        navigation.navigate('ProductDetails', { product, category: categorySelected });
    };

    const scrollToCategory = (categoryId: string) => {
        const categoryView = categoryRefs.current[categoryId];

        if (categoryView && scrollViewRef.current) {
            const handle = findNodeHandle(categoryView);
            if (handle) {
                categoryView.measureLayout(
                    findNodeHandle(scrollViewRef.current),
                    (x, y) => {
                        const offset = 160;
                        setTimeout(() => {
                            scrollViewRef.current?.scrollTo({ y: y - offset, animated: true });
                        }, 0);
                        setCategorySelected(categories.find(category => category.id === categoryId));
                    },
                    () => console.error('Erro ao medir a posição da categoria')
                );
            }
        }
        setExpandedCategory(categoryId);
    };

    useFocusEffect(
        React.useCallback(() => {
            setInitialLoad(true);
            return () => {
                setInitialLoad(false);
            };
        }, [])
    );

    useEffect(() => {
        if (categorySelected && !initialLoad) {
            scrollToCategory(categorySelected.id);
        }
    }, [categorySelected]);

    const toggleCategory = (id: string) => {
        if (expandedCategory === id) {
            setExpandedCategory(null);
            setInitialLoad(true);
        } else {
            setInitialLoad(false);
        }
    };

    // Função para formatar as horas
    const formatHours = (openingHours: string) => {
        const hours = JSON.parse(openingHours);

        // Verifica se as horas estão vazias e retorna uma mensagem alternativa
        if (Object.keys(hours).length === 0) {
            return ["Nenhum horário cadastrado"];
        }

        return Object.keys(hours).map((day) => {
            const open = hours[day].open || "Não cadastrado";
            const close = hours[day].close || "Não cadastrado";
            return `${day.charAt(0).toUpperCase() + day.slice(1)}: ${open} - ${close}`;
        });
    };

    const StoreSettingsModal = ({ visible, onClose, storeSettings }: any) => {
        const [hours, setHours] = useState<string[]>([]);

        useEffect(() => {
            if (storeSettings?.openingHours) {
                setHours(formatHours(storeSettings.openingHours));
            } else {
                setHours(["Nenhum horário cadastrado"]);
            }
        }, [storeSettings]);

        return (
            <Modal visible={visible} onRequestClose={onClose} animationType="fade">
                <View style={styles(theme).modalContainer}>
                    <Text style={styles(theme).modalTitle}>Horários de Funcionamento</Text>
                    <View style={styles(theme).hoursContainer}>
                        {hours.map((hour, index) => (
                            <Text key={index} style={styles(theme).hourText}>{hour}</Text>
                        ))}
                    </View>
                    <TouchableOpacity style={styles(theme).closeButton} onPress={onClose}>
                        <Text style={styles(theme).closeButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    };

    // Função para verificar se a loja está aberta
    const isStoreOpen = (openingHours: string) => {
        const hours = JSON.parse(openingHours);
        const currentDay = new Date().toLocaleString('en-us', { weekday: 'long' }).toLowerCase(); // Dia da semana atual em inglês (monday, tuesday, etc.)
        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        const dayHours = hours[currentDay];

        if (dayHours) {
            const { open, close } = dayHours;

            // Verifica se as horas de abertura e fechamento são válidas
            if (open && close) {
                // Verifica se o horário atual está dentro do intervalo de abertura
                return currentTime >= open && currentTime <= close;
            }
        }

        return false; // Se não houver horário cadastrado para o dia, considera fechado
    };

    return (
        <ScrollView ref={scrollViewRef} style={styles(theme).container} stickyHeaderIndices={[1]} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.primary]} />
        }>

            <ImageBackground
                source={storeSettings?.background && !imageError[storeSettings.id] ? { uri: `${api.defaults.baseURL}/uploads/${storeSettings?.background}` } : require('../../assets/img/background.jpg')}
                onError={() => setImageError(prev => ({ ...prev, [storeSettings.id]: true }))}
                style={styles(theme).headerImage}
                blurRadius={4}
            >
                <View style={styles(theme).headerIconsContainer}>
                    {isAuthenticated ? (
                        <TouchableOpacity style={styles(theme).profileButton} onPress={() => navigation.navigate('Perfil')}>
                            {user.profileImage && !imageError[user.id] ? (
                                <Image source={{ uri: `${api.defaults.baseURL}${user.profileImage}?t=${new Date().getTime()}` }}
                                    onError={() => setImageError(prev => ({ ...prev, [user.id]: true }))}
                                    style={styles(theme).profileImage} />
                            ) : (
                                <DefaultProfileImage style={styles(theme).profileImage} theme={theme} />
                            )}
                            <Text style={styles(theme).profileName}>
                                {user.name.split(' ')[0].toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles(theme).EntrarButton} onPress={() => navigation.navigate('SignIn')}>
                            <Icon name="log-in-outline" size={20} color={theme.white} />
                            <Text style={styles(theme).loginText}>ENTRAR</Text>
                        </TouchableOpacity>
                    )}


                    {tableNumber ? (
                        <TouchableOpacity style={styles(theme).tableExitButton} onPress={clearTable}>
                            <Text style={styles(theme).tableExitText}>MESA {tableNumber}</Text>
                            <Icon name="exit-outline" style={styles(theme).exitIcon} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles(theme).EntrarButton} onPress={() => navigation.navigate('Qrcode')}>
                            <Icon name="qr-code-outline" size={30} color={theme.white} />
                        </TouchableOpacity>
                    )}
                </View>
                {!storeSettings ? null : (
                    <>
                        {storeSettings?.logo && !imageError[storeSettings.id] ? (
                            <Image
                                source={{ uri: `${api.defaults.baseURL}/uploads/${storeSettings.logo}` }}
                                onError={() => setImageError(prev => ({ ...prev, [storeSettings.id]: true }))}
                                style={styles(theme).logo}
                            />
                        ) : (storeSettings?.logo && !imageError[storeSettings.id] ? (
                            <DefaultLogoImage style={styles(theme).logo} theme={theme} />
                        ) : (null)
                        )}
                        <>{storeSettings?.storeName &&
                            <Text style={styles(theme).title}>{storeSettings?.storeName || 'Nome da loja'}</Text>
                        }</>

                        <View style={styles(theme).buttonContainer}>
                            <View style={styles(theme).buttonSeparator}>
                                <>{storeSettings?.phone &&
                                    <TouchableOpacity style={styles(theme).whatsAppButton} onPress={() => Linking.openURL(`whatsapp://send?phone=${storeSettings?.phone}`)}>
                                        <Icon name="logo-whatsapp" size={22} color={theme.white} />
                                        <Text style={styles(theme).buttonText}>{storeSettings?.phone}</Text>
                                    </TouchableOpacity>
                                }</>
                                <>
                                    {storeSettings?.openingHours && storeSettings.openingHours !== '{"monday":{"open":"","close":""},"tuesday":{"open":"","close":""},"wednesday":{"open":"","close":""},"thursday":{"open":"","close":""},"friday":{"open":"","close":""},"saturday":{"open":"","close":""},"sunday":{"open":"","close":""}}' && (
                                        <TouchableOpacity style={styles(theme).hoursButton} onPress={() => setModalVisible(true)}>
                                            <Icon name="time-outline" size={22} color={theme.white} />
                                            <Text style={styles(theme).buttonText}>
                                                oi
                                                {/* {isOpen ? 'Aberto' : 'Fechado'} */}
                                            </Text>
                                        </TouchableOpacity>
                                    )}

                                    {storeSettings && (
                                        <StoreSettingsModal
                                            visible={isModalVisible}
                                            onClose={() => setModalVisible(false)}
                                            storeSettings={storeSettings}
                                        />
                                    )}
                                </>
                            </View>


                            <>{storeSettings?.address &&
                                <TouchableOpacity style={styles(theme).locationButton} onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(storeSettings?.address || 'Endereço não disponível')}`)}>
                                    <Icon name="location-outline" size={22} color={theme.white} />
                                    <Text style={styles(theme).buttonText}>{storeSettings?.address || 'Endereço não disponível'}</Text>
                                </TouchableOpacity>
                            }</>
                        </View>
                    </>
                )}
            </ImageBackground>

            <View style={styles(theme).categoriesSection}>
                <View style={styles(theme).productsHeader}>
                    <Text style={styles(theme).sectionTitle}>Produtos</Text>
                    <TouchableOpacity style={styles(theme).searchButton} onPress={() => navigation.navigate('Pesquisa')}>
                        <Icon name="search-outline" size={20} color={theme.white} />
                        <Text style={styles(theme).buttonText}>Pesquisar</Text>
                    </TouchableOpacity>
                </View>
                {loadingCategories && categories.length === 0 || categories.length === 0 ? null : (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles(theme).categories}>
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category.id}
                                style={[
                                    styles(theme).categoryButton,
                                    category.id === categorySelected?.id && styles(theme).selectedCategoryButton,
                                ]}
                                onPress={() => { scrollToCategory(category.id); toggleCategory(category.id); }}
                            >
                                <Icon name="fast-food-outline" style={styles(theme).categoryHorizontalIcon} />
                                <Text style={styles(theme).categoryText}>{category.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
            </View>

            <View style={styles(theme).productsSection}>
                {loadingCategories ? (
                    <View style={styles(theme).loadingContainer}>
                        <ActivityIndicator size={33} color={theme.primary} />
                    </View>
                ) : (
                    categories.length === 0 ? (
                        <View style={styles(theme).emptyMessageContainer}>
                            <Text style={styles(theme).emptyMessageText}>Nenhum produto ou categoria disponível no momento.</Text>
                        </View>
                    ) : (
                        categories.map((category) => (
                            <View
                                key={category.id}
                                style={styles(theme).categoryContainer}
                                ref={(ref) => (categoryRefs.current[category.id] = ref)}
                            >
                                <TouchableOpacity onPress={() => { scrollToCategory(category.id); toggleCategory(category.id); }} style={styles(theme).categoriasProdutos}>
                                    <Text style={styles(theme).categoryTitle}>{category.name}</Text>
                                    <Icon name={expandedCategory === category.id ? 'chevron-up-outline' : 'chevron-down-outline'} style={styles(theme).categoryIcon} />
                                </TouchableOpacity>
                                {expandedCategory === category.id && category.products?.map(product => (
                                    <TouchableOpacity
                                        key={product.id}
                                        style={styles(theme).productContainer}
                                        onPress={() => handleProductPress(product)}
                                    >
                                        {imageError[product.id] || !product.banner ? (
                                            <DefaultLogoImage style={styles(theme).productImage} theme={theme} />
                                        ) : (
                                            <Image
                                                source={{ uri: `${api.defaults.baseURL}${product.banner}?t=${new Date().getTime()}` }}
                                                onError={() => setImageError(prev => ({ ...prev, [product.id]: true }))}
                                                style={styles(theme).productImage}
                                            />
                                        )}
                                        <View style={styles(theme).productDetails}>
                                            <Text style={styles(theme).productName}>{product.name}</Text>
                                            <Text style={styles(theme).productDescription} numberOfLines={2}>
                                                {product.description}
                                            </Text>
                                            <Text style={styles(theme).productPrice}> {Number(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))
                    )
                )}
            </View>

        </ScrollView >
    );
}
