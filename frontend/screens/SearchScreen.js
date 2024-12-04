import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FoodGrid from '../components/FoodGrid';
import SearchBar from '../components/SearchBar';

const foods = [
  {
    id: '1',
    name: 'Món xào',
    image: require('../assets/phobo.jpeg'),
  },
  {
    id: '2',
    name: 'Món nướng',
    image: require('../assets/bunbo.jpeg'),
  },
  {
    id: '3',
    name: 'Món kho',
    image: require('../assets/miquang.jpeg'),
  },
  {
    id: '4',
    name: 'Gỏi',
    image: require('../assets/comtam.jpeg'),
  },
];

export default function SearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [filteredFoods, setFilteredFoods] = useState(foods);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = foods.filter((food) =>
      food.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredFoods(filtered);
  };

  const handleFoodPress = (food) => {
    navigation.navigate('FoodDetail', { food });
  };

  return (
    <View style={styles.container}>
      <SearchBar searchText={searchText} onChangeText={handleSearch} />
      <FoodGrid foods={filteredFoods} onFoodPress={handleFoodPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f1f1',
  },
});
