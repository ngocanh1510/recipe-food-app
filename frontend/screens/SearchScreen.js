import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  const renderFoodItem = ({ item }) => (
    <TouchableOpacity
      style={styles.foodItem}
      onPress={() => navigation.navigate('FoodDetail', { food: item })}
    >
      <Image source={item.image} style={styles.foodImage} />
      <Text style={styles.foodName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Tìm kiếm</Text>
        <TouchableOpacity>
          <Ionicons name="camera-outline" size={28} color="#881415" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={24} color="#881415" />
        <TextInput
          style={styles.searchInput}
          placeholder="Bạn muốn tìm món gì?"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      {/* List of Foods */}
      <View style={styles.foodSection}>
        <Text style={styles.sectionTitle}>Khám phá các món ăn</Text>
        <FlatList
          data={filteredFoods}
          keyExtractor={(item) => item.id}
          renderItem={renderFoodItem}
          numColumns={2}
          columnWrapperStyle={styles.foodRow}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f1f1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#881415',
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#f8f1f1',
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1, // Thêm thuộc tính này để tạo viền
    borderColor: '#881415', // Màu viền
  },  
  searchInput: {
    marginLeft: 10,
    color: '881415',
    fontSize: 16,
    flex: 1,
  },
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
