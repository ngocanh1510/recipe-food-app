import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icon

const FoodDetail = ({ route, navigation }) => {
  const { recipes } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Hình ảnh món ăn */}
      <Image source={{ uri: recipes.image }} style={styles.image} />

      {/* Tiêu đề món ăn */}
      <View style={styles.header}>
        <Text style={styles.foodName}>{recipes.title}</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>⏱ {recipes.time || '60 phút'}</Text>
          <TouchableOpacity onPress={() => alert('Đã lưu!')}>
            <Icon name="bookmark" size={24} color="#881415" style={styles.bookmarkIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Dòng mô tả */}
      <Text style={styles.description}>
        {recipes.description || 'Món ăn đậm đà hương vị truyền thống.'}
      </Text>

      {/* Thông tin dinh dưỡng */}
      <View style={styles.nutritionContainer}>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionTitle}>Tính bột</Text>
          <Text style={styles.nutritionValue}>{recipes.carbs || '65g'}</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionTitle}>Chất đạm</Text>
          <Text style={styles.nutritionValue}>{recipes.protein || '27g'}</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionTitle}>Năng lượng</Text>
          <Text style={styles.nutritionValue}>{recipes.calories || '120 calo'}</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionTitle}>Chất béo</Text>
          <Text style={styles.nutritionValue}>{recipes.fat || '9g'}</Text>
        </View>
      </View>

      {/* Nguyên liệu */}
      <Text style={styles.sectionTitle}>Nguyên liệu</Text>
      <View style={styles.ingredients}>
        {recipes.ingredients?.map((ingredient, index) => (
          <View key={index} style={styles.ingredientItem}>
            <Text style={styles.ingredientName}>{ingredient.name}</Text>
            <Text style={styles.ingredientQuantity}>{ingredient.quantity}</Text>
          </View>
        ))}
      </View>

      {/* Nút nấu ngay */}
      <TouchableOpacity style={styles.cookButton} onPress={() => alert('Bắt đầu nấu!')}>
        <Text style={styles.cookButtonText}>Nấu ngay</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  foodName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 16,
    color: 'gray',
  },
  bookmarkIcon: {
    marginLeft: 10, // Thêm khoảng cách giữa biểu tượng và thời gian
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  nutritionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionTitle: {
    fontSize: 14,
    color: 'gray',
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  ingredients: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 10,
  },
  ingredientName: {
    fontSize: 16,
    flex: 1,
  },
  ingredientQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cookButton: {
    backgroundColor: '#881415',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  cookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FoodDetail;
