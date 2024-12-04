import React from 'react';
import { getAllCategories, getRecipesInHomepage } from '../src/api/api';
import { useState,useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  const [categories,setCategories]=useState([])
  const [recipes, setRecipes] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true); 
      const data = await getRecipesInHomepage(); 
      if (data) setRecipes(data); 
      setIsLoading(false);
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true); 
      const data = await getAllCategories(); 
      if (data) setCategories(data); 
      setIsLoading(false);
    };
    fetchCategories();
  }, []);

  const renderFoodItem = ({ item }) => (
    <TouchableOpacity
      style={styles.foodItem}
      onPress={() => navigation.navigate('FoodDetail', { recipes: item })}
    >
      <Image
      source={{ uri: item.image }}  
      style={styles.foodImage}
    />
      <Text style={styles.foodName}>{item.title}</Text>
    </TouchableOpacity>
  );

  // Hàm render item cho danh sách thể loại món ăn
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.foodCategory}>
      <Text style={styles.foodCategoryText}>{item.name}</Text>
    </TouchableOpacity>
  );
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#881415" />
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.user}>
          <Image
            source={require('../assets/325471648_3435328433353012_6625490091817151127_n.jpg')} // Thay bằng avatar của bạn
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.greeting}>Chào buổi sáng</Text>
            <Text style={styles.username}>Em bot</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" style={styles.notification} />
        </TouchableOpacity>
      </View>

      {/* Featured Dish */}
      <View style={styles.dishItem}>
  <View>
    <Text style={styles.dishName}>{recipes[0]?.title || "Loading..."}</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        if (recipes.length > 0) {
          navigation.navigate('FoodDetail', { recipes: recipes[0] });
        }
      }}
    >
      <Text style={styles.buttonText}>Tìm hiểu ngay</Text>
      <MaterialCommunityIcons name="arrow-right-thin" style={styles.icon} />
    </TouchableOpacity>
  </View>
  {recipes[0]?.image ? (
    <Image source={{ uri: recipes[0].image }} style={styles.dishImage} />
  ) : (
    <Text style={{ color: 'white', marginLeft: 15 }}>Đang tải ảnh...</Text>
  )}
</View>

      {/* Food List Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hôm nay ăn gì?</Text>
        <FlatList
          data={recipes}
          keyExtractor={(item) => (item._id ? item._id.toString() : '')}
          renderItem={renderFoodItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.foodList}
        />
      </View>

      {/* Popular Categories */}
      <View style={styles.section}>
        <View style={styles.categoryHeader}>
          <Text style={styles.sectionTitle}>Thể loại phổ biến</Text>
          <TouchableOpacity>
            <Text style={styles.seemore}>Xem thêm</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={categories}
          keyExtractor={(item, id) => id.toString()}
          renderItem={renderCategoryItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.foodCategories}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5edea',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  user: {
    flexDirection: 'row',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  greeting: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10,
    color: 'gray',
    marginLeft: 10,
  },
  username: {
    fontSize: 25,
    marginLeft: 25,
    color: '#881415',
  },
  notification: {
    fontSize: 25,
    color: 'gray',
    fontWeight: '900',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5edea',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#881415',
  },
  button: {
    marginTop: 10,
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 17,
    borderRadius: 25,
    flexDirection: 'row',
    marginLeft: 10,
  },
  icon: {
    fontSize: 20,
    marginLeft: 5,
    color: '#881415',
  },
  buttonText: {
    color: '#881415',
    fontWeight: 'bold',
    marginTop: 1,
  },
  dishItem: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#881415',
    marginHorizontal: 15,
    paddingVertical: 18,
    borderRadius: 13,
  },
  dishImage: {
    width: 160,
    height: 160,
    borderRadius: 100,
    marginLeft: 15,
  },
  dishName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 25,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
  foodList: {
    marginTop: 10,
  },
  foodItem: {
    marginRight: 15, // Khoảng cách giữa các món ăn
  },
  foodImage: {
    width: 160,  // Cố định kích thước ảnh
    height: 120, // Cố định kích thước ảnh
    borderRadius: 15,  // Bo tròn ảnh
  },
  foodName: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  foodCategories: {
    flexDirection: 'row',
    marginTop: 10,
  },
  foodCategory: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    borderColor: '#881415',
    borderWidth: 1,
  },
  foodCategoryText: {
    fontSize: 16,
    textAlign: 'center',
    color:'black'
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Căn giữa theo chiều dọc
    marginBottom: 10,
  },
  seemore: {
    color: '#881415',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
