import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Modal,
    FlatList,

} from "react-native";
import { styles } from "./style";

import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons"
import { api } from "../../services/api";
import { ModalPicker } from "../../components/ModalPicker";
import { ListItem } from "../../components/ListItem";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../../routes/app.routes";

//tipagem
type RouteDetailParams = {
    Order: {
        number: number | string;
        order_id: string;
    };
};

export type CategoryProps = {
    id: string;
    name: string;
};

type ProductProps = {
    id: string;
    name: string;
}

type ItemProps = {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order() {
    const route = useRoute<OrderRouteProps>();
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();

    const [category, setCategory] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps>();
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

    const [products, setProducts] = useState<ProductProps[] | []>([]);
    const [productSelected, setProdctSelected] = useState<ProductProps | undefined>();
    const [modalProductVisible, setModalProductVisible] = useState(false);

    const [amount, setAmount] = useState('1');
    const [items, setItems] = useState<ItemProps[]>([]);

    useEffect(() => {
        async function loadInfo() {
            const response = await api.get('/category')
            setCategory(response.data);
            setCategorySelected(response.data[0])
        }

        loadInfo();
    }, [])

    useEffect(() => {
        async function loadProduct() {
            const response = await api.get('/category/product', {
                params: {
                    category_id: categorySelected?.id
                }
            })

            setProducts(response.data)
            setProdctSelected(response.data[0])
        }
        loadProduct();
    }, [categorySelected])

    async function handleCloseOrder() {
        try {
            await api.delete('/order', {
                params: {
                    order_id: route.params?.order_id,
                }
            });
            navigation.navigate('Home');
        } catch (err) {
            console.log(err);
        }
    }

    function handleChangeCategory(item: CategoryProps) {
        setCategorySelected(item);
    }

    function handleChangeProduct(item: ProductProps) {
        setProdctSelected(item);
    }

    //adicionando produto nessa mesa
    async function handleAdd() {
        const response = await api.post('/order/add', {
            order_id: route.params.order_id,
            product_id: productSelected?.id,
            amount: Number(amount),
        });

        let data = {
            id: response.data.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            amount: amount,
        }

        setItems(oldArray => [...oldArray, data]);

    }

    async function handleDeleteItem(item_id: string) {
        await api.delete('/order/remove', {
            params: {
                item_id: item_id,
            }
        });

        //após remover da api removemos esse item da lista de items
        let removeItem = items.filter(item => {
            return (item.id !== item_id)
        });

        setItems(removeItem);

    }

    function handleFinishOrder() {
        navigation.navigate('FinishOrder',{
            number: route.params?.number, 
            order_id: route.params?.order_id
        });
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                {items.length === 0 && (
                    <TouchableOpacity onPress={handleCloseOrder}>
                        <Feather name="trash-2" size={28} color="#FF3F4b" />
                    </TouchableOpacity>
                )}
                <Text style={styles.title}>  Mesa {route.params.number}</Text>
            </View>

            {category.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
                    <Text style={{ color: '#FFF' }}>
                        {categorySelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            {products.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
                    <Text style={{ color: '#FFF' }}>
                        {productSelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade</Text>
                <TextInput
                    style={[styles.input, { width: '60%', textAlign: 'center' }]}
                    placeholderTextColor={"#F0F0F0"}
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity
                 style={[styles.button,{ opacity: items.length === 0 ? 0.3 : 1 }]}
                disabled={items.length === 0}
                onPress={handleFinishOrder}
                >
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginTop: 24 }}
                data={items}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ListItem data={item}  deleteItem={handleDeleteItem}/>}
            />

            <Modal
                transparent={true}
                visible={modalCategoryVisible}
                animationType="fade"
            >
                <ModalPicker
                    handleCloseModal={() => setModalCategoryVisible(false)}
                    options={category}
                    selectedItem={handleChangeCategory}
                />
            </Modal>

            <Modal
                transparent={true}
                visible={modalProductVisible}
                animationType="fade"
            >
                <ModalPicker
                    handleCloseModal={() => setModalProductVisible(false)}
                    options={products}
                    selectedItem={handleChangeProduct}
                />

            </Modal>

        </View>
    );
}

