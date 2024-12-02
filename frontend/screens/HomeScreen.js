import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  // Danh sách món ăn với thông tin chi tiết
  const foods = [
    {
      id: '1',
      name: 'Phở Hà Nội',
      image: require('../assets/phobo.jpeg'),
      description: 'Phở truyền thống Hà Nội ngon ngọt đậm đà.',
      carbs: '65g',
      protein: '27g',
      calories: '120 calo',
      fat: '9g',
      time: '60 phút',
      ingredients: ['Phở: 1 gói', 'Thịt bò: 500g', 'Hành lá: 50g', 'Gừng: 1 củ'],
    },
    {
      id: '2',
      name: 'Bún bò Huế',
      image: require('../assets/bunbo.jpeg'),
      description: 'Bún bò Huế với hương vị cay nồng đặc trưng miền Trung.',
      carbs: '70g',
      protein: '30g',
      calories: '150 calo',
      fat: '10g',
      time: '75 phút',
      ingredients: ['Bún: 1 gói', 'Thịt bò: 400g', 'Sả: 3 cây', 'Ớt: 2 quả'],
    },
    {
      id: '3',
      name: 'Mì Quảng',
      image: require('../assets/miquang.jpeg'),
      description: 'Mì Quảng Đà Nẵng, đậm đà với nước sốt đặc biệt.',
      carbs: '80g',
      protein: '25g',
      calories: '200 calo',
      fat: '15g',
      time: '50 phút',
      ingredients: ['Mì Quảng: 1 gói', 'Thịt gà: 500g', 'Cà chua: 2 quả'],
    },
    {
      id: '4',
      name: 'Cơm tấm',
      image: require('../assets/comtam.jpeg'),
      description: 'Cơm tấm Sài Gòn với sườn nướng, trứng ốp la.',
      carbs: '90g',
      protein: '35g',
      calories: '250 calo',
      fat: '20g',
      time: '40 phút',
      ingredients: ['Gạo tấm: 200g', 'Sườn nướng: 300g', 'Trứng: 1 quả'],
    },
  ];

  // Hàm render item cho FlatList
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
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.user}>
          <Image
            source={require('../assets/325471648_3435328433353012_6625490091817151127_n.jpg')}
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
          <Text style={styles.dishName}>Cơm tấm</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Tìm hiểu ngay</Text>
            <MaterialCommunityIcons name="arrow-right-thin" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <Image
          source={require('../assets/comtam.jpeg')}
          style={styles.dishImage}
        />
      </View>

      {/* Food List Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hôm nay ăn gì?</Text>
        <FlatList
          data={foods}
          keyExtractor={(item) => item.id}
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
        <View style={styles.foodCategories}>
          <TouchableOpacity style={styles.foodCategory}>
            <Text style={styles.foodCategoryText}>Cơm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.foodCategory}>
            <Text style={styles.foodCategoryText}>Cháo/Súp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.foodCategory}>
            <Text style={styles.foodCategoryText}>Bún/Bánh canh</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5edea',
  },
  header: {
    paddingTop: 40,
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
    marginRight: 15,
  },
  foodImage: {
    width: 160,
    height: 120,
    borderRadius: 15,
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
  },
  seemore: {
    color: '#881415',
    fontSize: 18,
  },
});

export default HomeScreen;
