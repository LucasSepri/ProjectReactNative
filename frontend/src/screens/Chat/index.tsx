import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../styles/COLORS';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';

type NavigationProp = NativeStackNavigationProp<StackParamList>;

const ChatScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const { isAuthenticated } = useContext(AuthContext);


    const sendMessage = () => {
        // if (!isAuthenticated) {
        //     Alert.alert(
        //         "Atenção",
        //         "Para adicionar enviar uma mensagem, você precisa estar logado.",
        //         [
        //             { text: "Cancelar", style: "cancel" },
        //             { text: "Login", onPress: () => navigation.navigate('SignIn') }
        //         ]
        //     );
        //     return;
        // }
        if (input.trim()) {
            setMessages([...messages, { id: Date.now().toString(), text: input }]);
            setInput(''); // Limpa o campo de entrada
        }
    };

    const renderMessage = ({ item }) => (
        <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={
                styles.tituloScreen
            }>
                Atendimento Online
            </Text>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messageList}
                inverted // Inverte a lista para que a última mensagem apareça na parte inferior
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Digite sua mensagem..."
                />
                <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                    <Icon name="send" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: COLORS.white,
        // paddingBottom: 90,

    },
    tituloScreen: {
        textAlign: 'center',
        fontSize: 25,
        backgroundColor: COLORS.primary,
        padding: 10,
        color: COLORS.white,
        elevation: 2,
        // borderRadius: 10,
        //   margin: 10
    },
    messageList: {
        padding: 10,
        backgroundColor: COLORS.background,
    },
    messageContainer: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        alignSelf: 'flex-start', // Alinha as mensagens à esquerda
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingBottom: 90,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 50,
        padding: 10,
    },
});

export default ChatScreen;
