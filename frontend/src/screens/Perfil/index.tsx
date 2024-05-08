import React, { useContext } from "react";
import {
    View,
    Text,
    ImageBackground, 
    Image, 
    TouchableOpacity, 
    ScrollView, 
    Button
} from "react-native";

import { AuthContext } from "../../context/AuthContext";

export default function Perfil() {
    const { user, signOut } = useContext(AuthContext);

    return (
        <ScrollView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../assets/background.jpg')}
                style={{ width: '100%', height: 200, alignItems: 'center', justifyContent: 'center' }}
                resizeMode="cover"
            >
                <Image
                    source={require('../../assets/logo.png')}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold', color: '#fff' }}>{user.name}</Text>
                <Text style={{ fontSize: 16, color: '#fff' }}>{user.email}</Text>
            </ImageBackground>

            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Informações do Perfil</Text>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 16 }}>Nome: {user.name}</Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 16 }}>E-mail: {user.email}</Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 16 }}>ID: {user.id}</Text>
                </View>
                {/* Adicione outras informações do perfil aqui, se necessário */}
            </View>

            <TouchableOpacity
                style={{ backgroundColor: 'red', padding: 10, alignItems: 'center', justifyContent: 'center', margin: 20 }}
                onPress={signOut}
            >
                <Text style={{ color: '#fff', fontSize: 16 }}>Sair da Conta</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
