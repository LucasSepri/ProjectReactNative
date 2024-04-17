import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import foods from '../../context/foods';

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (itemId) => {
    setFavorites(prevFavorites => {
      const index = prevFavorites.findIndex(item => item.id === itemId);
      if (index !== -1) {
        const updatedFavorites = [...prevFavorites];
        updatedFavorites.splice(index, 1);
        return updatedFavorites;
      } else {
        const selectedItem = foods.find(item => item.id === itemId);
        return [...prevFavorites, selectedItem];
      }
    });
  };

  const renderItem = ({ item }) => {
    if (!item.favorited) return null;
    return (
      <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.itemContainer}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Favorite Pizzas</Text>
      <FlatList
        data={foods}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
    marginBottom:60,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
});

export default FavoritePage;
