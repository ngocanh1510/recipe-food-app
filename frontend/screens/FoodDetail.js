import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

const FoodDetail = ({ route, navigation }) => {
  const { recipe } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Hình ảnh món ăn */}
      <Image source={recipe.image} style={styles.image} />

      {/* Tiêu đề món ăn */}
      <View style={styles.header}>
        <Text style={styles.foodName}>{food.name}</Text>
        <View style={styles.actionContainer}>
          <Text style={styles.time}>⏱ {food.time}</Text>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => alert('Đã lưu công thức!')}
          >
            <Text style={styles.saveButtonText}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Dòng mô tả */}
      <Text style={styles.description}>{food.description}</Text>

      {/* Thông tin dinh dưỡng */}
      <View style={styles.nutritionContainer}>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionTitle}>Tính bột</Text>
          <Text style={styles.nutritionValue}>{food.carbs}</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionTitle}>Chất đạm</Text>
          <Text style={styles.nutritionValue}>{food.protein}</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionTitle}>Năng lượng</Text>
          <Text style={styles.nutritionValue}>{food.calories}</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionTitle}>Chất béo</Text>
          <Text style={styles.nutritionValue}>{food.fat}</Text>
        </View>
      </View>

      {/* Nguyên liệu */}
      <Text style={styles.sectionTitle}>Nguyên liệu</Text>
      <View style={styles.ingredients}>
        {recipe.ingredients?.map((ingredient, index) => (
          <View key={index} style={styles.ingredientItem}>
            <Text style={styles.ingredientText}>{ingredient}</Text>
          </View>
        )) || (
          <View style={styles.ingredientItem}>
            <Text style={styles.ingredientText}></Text>
            <Text style={styles.ingredientText}></Text>
          </View>
        )}
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
    alignItems: 'center',
  },
  foodName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 16,
    color: 'gray',
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#881415',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
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
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 10,
  },
  ingredientText: {
    fontSize: 16,
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
