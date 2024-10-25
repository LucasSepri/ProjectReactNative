import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../styles/COLORS";

interface ItemProps {
    data:{
        id: string;
        product_id: string;
        name: string;
        amount: string | number;
    };
    deleteItem: (iten_id: string) => void;
}

export function ListItem({data, deleteItem}: ItemProps) {

    function handleDeleteItem(){
      deleteItem(data.id);
    }

  return (
    <View style={styles.container}>
        <Text style={styles.item}>{data.amount} - {data.name}</Text>

        <TouchableOpacity onPress={handleDeleteItem}>
            <Feather name="trash-2" size={24} color={COLORS.red}/>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: COLORS.dark,
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom:12,
        paddingVertical:12,
        paddingHorizontal: 12,
        borderRadius: 4,
        borderWidth: 0.3,
        borderColor: COLORS.darkGrey,
    },
    item:{
        color: COLORS.white,
        fontSize: 16,
    }
});