import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, Animated, ImageBackground } from "react-native";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";

export default function Login({ navigation }) {
    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 90 }));
    const [opac] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.parallel([
            Animated.spring(offset.y, {
                toValue: 0,
                speed: 4,
                bounciness: 20,
            }),
            Animated.timing(opac, {
                toValue: 1,
                duration: 1000,
            })
        ]).start();
    }, []);

    return (
        <ImageBackground source={require('../../../assets/img/fundo3.jpg')} style={styles.imgBg}>

            <KeyboardAvoidingView
                style={styles.background}>
                <View style={styles.logo}>
                    <Image style={{ width: 320 }} resizeMode="contain" source={require('../../../assets/img/logo.png')}></Image>
                </View>

                <Animated.View
                    style={[styles.Formulario,
                    {
                        opacity: opac,
                        transform: [{ translateY: offset.y }]
                    }
                    ]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Insira seu Email"
                        type="email"
                        autoCorrect={false}
                        onChangeText={() => { }}
                    ></TextInput>

                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        secureTextEntry={true}
                        dataCorrect={false}
                        onChangeText={() => { }}
                    ></TextInput>

                    {/* Botão Logar */}
                    <View style={styles.viewBotao}>
                        <TouchableOpacity
                            style={styles.botao}
                            onPress={() => navigation.navigate('Home')}>
                            <Text style={styles.textoBotao}>Logar</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.botaoRecuperar}
                        onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.textoRecuperar}>Rexuperar Senha</Text>
                    </TouchableOpacity>

                </Animated.View>
            </KeyboardAvoidingView>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        //backgroundColor: "#191919",
        alignItems: "center",
        justifyContent: "center",
    },

    logo: {
        flex: 1,
        justifyContent: "center",
    },

    Formulario: {  
        flex: 1,
        paddingBottom:30,
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        marginTop: -50
    },

    input: {
        backgroundColor: "#FFF",
        marginBottom: 15,
        color: "#222",
        fontSize: 17,
        borderRadius: 7,
        padding: 10,
        width: "90%"
    },

    viewBotao:{
        width: "90%",
        borderRadius: 7,
    },

    botao:{
        backgroundColor: "#1a7487",
        height: 45,
        alignItems: "center",
        justifyContents: "center",
        borderRadius: 7,
        padding: 10,
    },

    textoBotao:{
        color: "#FFF",
        fontSize: 18,
    },

    botaoRecuperar:{
        marginTop:15,
    },

    textoRecuperar:{
        color: "#FFF",
    },

    imgBg:{
        flex: 1,
        width: null,
        height: null,
        opacity: 1,
        justifyContent: "flex-start", 
        backgroundColor: "#000"
    }
});