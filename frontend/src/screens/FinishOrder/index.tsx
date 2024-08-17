import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import { Feather } from "@expo/vector-icons";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native"; 
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../../routes/app.routes";

import { api } from "../../services/api";

type RouteDetailParams = {
    FinishOrder: {
        number: number | string;
        order_id: string;
    };
};

type FinishOrderRouteProps = RouteProp<RouteDetailParams, 'FinishOrder'>;

export default function FinishOrder() {
    const route = useRoute<FinishOrderRouteProps>();
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();

    async function handleFinishOrder() {
        try {
            await api.post(`/order/send`, {
                order_id: route.params?.order_id,
            });

            navigation.popToTop();
        } catch (err) {
            alert("Erro ao finalizar, tente mais tarde");
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.alert}>Você deseja finalizar esse pedido?</Text>
            <Text style={styles.title}>Mesa {route.params?.number}</Text>

            <TouchableOpacity 
            style={styles.button}
            onPress={handleFinishOrder}
            >
                <Text style={styles.textButton}>Finalizar pedido</Text>
                <Feather
                    name="shopping-cart"
                    size={20}
                    color="#1d1d2e"
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingHorizontal: '4%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alert: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 12,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#3fffa3',
        flexDirection: 'row',
        width: '65%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    textButton: {
        fontSize: 18,
        marginRight: 8,
        fontWeight: 'bold',
        color: '#1d1d2e',
    }
});