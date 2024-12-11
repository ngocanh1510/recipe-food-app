import React, { useState , useEffect} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icon
import { post } from '../src/api/api';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FoodDetail = ({ route, navigation }) => {
  const { recipes } = route.params;

  // State to track the save status
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const loadSaveStatus = async () => {
      try {
        const savedRecipes = await AsyncStorage.getItem('savedRecipes');
        if (savedRecipes) {
          const savedRecipesArray = JSON.parse(savedRecipes);
          setIsSaved(savedRecipesArray.includes(recipes._id));
        }
      } catch (error) {
        console.error('Error loading save status:', error);
      }
    };

    loadSaveStatus();
  }, [recipes._id]);

  // Handle saving the recipe
  const handleSave = async () => {
    try {
      // Gửi yêu cầu đến API để lưu công thức
      const response = await post(`/recipe/${recipes._id}/toggle-save`);

      // if (response.status === 200) {
      //   setIsSaved(!isSaved); // Toggle trạng thái lưu
      //   Alert.alert('Thông báo', response.data.message);
      // } else {
      //   alert('Đã có lỗi xảy ra! Vui lòng thử lại.');
      // }
      if (response.status === 200) {
        const newSaveStatus = !isSaved;
        setIsSaved(newSaveStatus);

        // Lưu trạng thái vào AsyncStorage
        const savedRecipes = await AsyncStorage.getItem('savedRecipes');
        let savedRecipesArray = savedRecipes ? JSON.parse(savedRecipes) : [];

        if (newSaveStatus) {
          savedRecipesArray.push(recipes._id); // Thêm ID vào danh sách
        } else {
          savedRecipesArray = savedRecipesArray.filter((id) => id !== recipes._id); // Loại bỏ ID
        }

        await AsyncStorage.setItem('savedRecipes', JSON.stringify(savedRecipesArray));
        Alert.alert('Thông báo', response.data.message);
      } else {
        alert('Đã có lỗi xảy ra! Vui lòng thử lại.');
      }
    } catch (error) {
      alert('Đã có lỗi xảy ra! Vui lòng thử lại.');
      console.error("Error during save recipe:", error);
    }
  };

  // Handle navigation to CookingStepsScreen
  const handleCookingSteps = () => {
    navigation.navigate('CookingSteps', { steps: recipes.steps });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        {/* Hình ảnh món ăn */}
        <Image source={{ uri: recipes.image }} style={styles.image} />

        {/* Tiêu đề món ăn */}
        <View style={styles.header}>
          <Text style={styles.foodName}>{recipes.title}</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>⏱ {recipes.time || '60 phút'}</Text>
            <TouchableOpacity onPress={handleSave}>
              <Icon
                name="bookmark"
                size={24}
                color={isSaved ? '#881415' : 'gray'} // Change color based on save status
                style={styles.bookmarkIcon}
              />
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
        <TouchableOpacity style={styles.cookButton} onPress={handleCookingSteps}>
          <Text style={styles.cookButtonText}>Nấu ngay</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 80,
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
