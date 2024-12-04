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
    flexDirection: 'row', // Đặt các phần tử nằm ngang
    alignItems: 'center', // Căn giữa theo chiều dọc
    backgroundColor: '#f8f1f1',
    borderRadius: 8,
    padding: 10,

    marginBottom: 10, // Khoảng cách giữa các item
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  foodImage: {
    width: 60, // Kích thước nhỏ hơn
    height: 60,
    borderRadius: 8,
    marginRight: 15, // Khoảng cách giữa ảnh và tên
  },
  foodName: {
    color: '#881415',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1, // Để đảm bảo tên chiếm phần còn lại của row
  },
});
