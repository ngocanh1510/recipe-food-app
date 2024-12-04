
import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const FoodGrid = ({ foods, onFoodPress }) => {
  const renderFoodItem = ({ item }) => (
    <TouchableOpacity
      style={styles.foodItem}
      onPress={() => onFoodPress(item)}
    >
      <Image source={item.image} style={styles.foodImage} />
      <Text style={styles.foodName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.foodSection}>
      <Text style={styles.sectionTitle}>Khám phá các món ăn</Text>
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        renderItem={renderFoodItem}
        numColumns={2}
        columnWrapperStyle={styles.foodRow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  foodSection: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    color: '#881415',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  foodRow: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  foodItem: {
    width: '48%',
    backgroundColor: '#881415',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  foodName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FoodGrid;