import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllRecipes } from '../src/api/api';

export default function SearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      const data = await getAllRecipes();
      if (data) {
        setRecipes(data);
        setFilteredFoods(data);
      }
      setIsLoading(false);
    };
    fetchRecipes();
  }, []);

  // Search function
  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredFoods(filtered);
  };

  const renderFoodItem = ({ item }) => (
    <TouchableOpacity
      style={styles.foodItem}
      onPress={() => navigation.navigate('FoodDetail', { recipes: item })}
    >
      <Image source={{ uri: item.image }} style={styles.foodImage} />
      <Text style={styles.foodName}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>

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

      {/* Loading Indicator */}
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#881415" />
        </View>
      ) : (
        <View style={styles.foodSection}>
          <Text style={styles.sectionTitle}>Khám phá các món ăn</Text>

          {/* No Results */}
          {filteredFoods.length === 0 && (
            <Text style={styles.noResults}>Không tìm thấy món ăn phù hợp.</Text>
          )}

          {/* List of Foods */}
          <FlatList
            data={filteredFoods}
            keyExtractor={(item) => (item._id ? item._id.toString() : '')}
            renderItem={renderFoodItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
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
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#881415',
    marginBottom: 10,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
    color: '#881415',
  },
  foodSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#881415',
    marginBottom: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResults: {
    color: '#881415',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#881415',
    flex: 1,
  },
});
