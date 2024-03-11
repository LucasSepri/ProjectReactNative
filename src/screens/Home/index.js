import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


// Exemplo de lógica para verificar se o estabelecimento está aberto
const isEstabelecimentoAberto = () => {
    const horarioAtual = new Date().getHours();
    const horarioAbertura = 10; // Substitua pelo horário de abertura do estabelecimento
    const horarioFechamento = 20; // Substitua pelo horário de fechamento do estabelecimento

    return horarioAtual >= horarioAbertura && horarioAtual <= horarioFechamento;
};

export default Home = ({navigation}) => {
    const [pizzas, setPizzas] = useState([
        { id: '1', nome: 'Margherita', ingredientes: 'Molho de tomate, mussarela, manjericão', preco: 'R$ 30.00', imagemUri: 'https://static.wixstatic.com/media/512c11_b14cc37b59b64dec826bc6e042b4cbd2~mv2.jpg/v1/fill/w_560,h_372,al_c,lg_1,q_80,enc_auto/512c11_b14cc37b59b64dec826bc6e042b4cbd2~mv2.jpg', favorito: false },
        { id: '2', nome: 'Pepperoni', ingredientes: 'Molho de tomate, pepperoni, queijo', preco: 'R$ 35.00', imagemUri: 'https://cdn.folhape.com.br/img/pc/1100/1/dn_arquivo/2023/07/creditos-shutterstock.jpg', favorito: false },
        { id: '3', nome: 'Vegetariana', ingredientes: 'Molho de tomate, cogumelos, pimentão, cebola, azeitonas', preco: 'R$ 32.00', imagemUri: 'https://invexo.com.br/blog/wp-content/uploads/2022/10/pizza-inteira-pizzaria-barra-da-tijuca-rio-de-janeiro.jpg', favorito: false },
    ]);

    const [showAdicionaisModal, setShowAdicionaisModal] = useState(false);
    const [numColumns, setNumColumns] = useState(2);

    const toggleFavorito = (id) => {
        setPizzas(prevPizzas =>
            prevPizzas.map(pizza =>
                pizza.id === id ? { ...pizza, favorito: !pizza.favorito } : pizza
            )
        );
    };

    const openAdicionaisModal = () => {
        setShowAdicionaisModal(true);
    };

    const closeAdicionaisModal = () => {
        setShowAdicionaisModal(false);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <TouchableOpacity style={styles.favoritoButton} onPress={() => toggleFavorito(item.id)}>
                <View style={styles.favoritoButtonContainer}>
                    <Icon name={item.favorito ? 'heart' : 'heart-outline'} size={24} color={item.favorito ? 'red' : 'black'} />
                </View>
            </TouchableOpacity>
            <Image source={{ uri: item.imagemUri }} style={styles.imagemPizza} />
            <Text style={styles.pizzaNome}>{item.nome}</Text>
            <Text style={styles.pizzaIngredientes}>{item.ingredientes}</Text>
            <Text style={styles.preco}>{item.preco}</Text>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.adicionarButton} onPress={openAdicionaisModal}>
                    <Icon name="add-circle-outline" size={32} color="blue" style={styles.adicionarIcon} />
                    <Text style={styles.adicionarButtonText}>Adicionar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Button title="Ir para Login" onPress={() => navigation.navigate('Login')} />
            <View style={styles.headerContainer}>
                <Image source={require('../../../assets/icon.png')} style={styles.logo} />

                <View style={styles.contactContainer}>
                    <TouchableOpacity style={styles.contactButton}>
                        <Icon name="call" size={20} color="#fff" />
                        <Text style={styles.contactButtonText}>Fale Conosco</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.addressContainer}>
                    <Text style={styles.address}>Endereço da Pizzaria</Text>
                    <Text style={styles.openStatus}>
                        {isEstabelecimentoAberto() ? 'Aberto agora' : 'Fechado agora'}
                    </Text>
                </View>
            </View>
            <Text style={styles.titulo}>Menu de Pizzas</Text>
            <FlatList
                data={pizzas}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id + numColumns}
                numColumns={numColumns}
                contentContainerStyle={styles.flatListContainer}
            />

            {/* Modal de Seleção de Adicionais */}
            <Modal visible={showAdicionaisModal} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitulo}>Selecione os Adicionais</Text>
                    {/* Adicione aqui a interface para a seleção de adicionais, borda, tamanho, etc. */}
                    <Button title="Fechar" onPress={closeAdicionaisModal} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    flatListContainer: {
        paddingBottom: 66,
    },
    card: {
        flex: 1,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 16,
        margin: 8,
        position: 'relative',
    },
    imagemPizza: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
    pizzaNome: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    pizzaIngredientes: {
        color: '#666',
        marginBottom: 8,
    },
    preco: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    favoritoButtonContainer: {
        backgroundColor: 'white',
        borderRadius: 24, // ou o valor que preferir
        padding: 8,
    },
    favoritoButton: {
        position: 'absolute',
        top: 5,
        left: 5,
        zIndex: 1,
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'center',  // Centraliza verticalmente
        alignItems: 'center',      // Centraliza horizontalmente
    },
    adicionarButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        elevation: 3,
    },
    adicionarIcon: {
        marginRight: 8,
    },
    adicionarButtonText: {
        color: 'blue',
        fontSize: 18,
        fontWeight: 'bold',
    },
    // Estilos para o Modal
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalTitulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'white',
    },





    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginLeft: 16,
    },
    contactButtonText: {
        color: '#fff',
        marginLeft: 8,
    },
    addressContainer: {
        flex: 1,
        marginLeft: 16,
    },
    address: {
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
    },
    openStatus: {
        fontSize: 14,
        color: isEstabelecimentoAberto() ? '#4CAF50' : '#D32F2F',
    },
});

