import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from './style';
import { COLORS } from '../../styles/COLORS';
import Icon from 'react-native-vector-icons/Ionicons';

import {api} from '../../services/api';



export default function ModalProduto({ productSelected, setModalVisible}) {


    return (
        <View style={styles.modalContainer}>
            {productSelected && (

                <View style={styles.modalContent}>
                    {/* Close button */}
                    <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={styles.modalCloseButton}
                    >
                        <Icon name="close" size={44} color={COLORS.black} />
                    </TouchableOpacity>

                    {/* Product information */}
                    <View style={styles.imageContainerModal}>
                        <Image
                            source={{ uri: `${api.defaults.baseURL}/files/${productSelected.banner}` }}
                            style={styles.imageModal}
                        />
                    </View>
                    <Text style={styles.modalTitle}>
                        {productSelected.name}</Text>
                    <Text style={styles.modalDescription}>{productSelected.description}</Text>
                    <Text style={styles.modalIngredients}>{productSelected.ingredients}</Text>
                    <Text style={styles.modalPrice}>R$ {productSelected.price}</Text>

                </View>
            )}
        </View>
    );
}