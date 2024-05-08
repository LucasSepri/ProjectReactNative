import React, { useState, useContext } from 'react';
import {
    Text,
    TouchableOpacity,
    ImageBackground,
    View,
    Image,
    ScrollView
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';
import { AuthContext } from '../../context/AuthContext'; // Importe o contexto de autenticação

import Icon from 'react-native-vector-icons/Ionicons';
import Carousel from '../../components/Carousel';
import styles from './style';


export default function Dashboard() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const { isAuthenticated, user } = useContext(AuthContext); // Use o contexto de autenticação

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
                            <Image source={require('../../assets/logo.png')} style={styles.perfilFoto} />
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

            {/****** CARROSSEL DE PROMOÇÕES *******/}
            <Carousel />

            {/****** BOTÕES DE CATEGORIAS *******/}










        </ScrollView>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingVertical: 15,
//         backgroundColor: '#1d1d2e'
//     },
//
// });