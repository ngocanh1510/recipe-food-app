import React, { useRef } from 'react';
import { getAllCategories, getRecipesInHomepage, getRecipesByCategory } from '../src/api/api';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  useAnimatedStyle 
} from 'react-native-reanimated';
import { useUser } from '../context/UserContext';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { get } from '../src/api/api';

const ShimmerEffect = ({ width, height, style }) => {
  const translateX = useSharedValue(-width);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width, { duration: 1000 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[{ width, height, overflow: 'hidden', backgroundColor: '#DFDFDF' }, style]}>
      <Animated.View style={[{ width: '100%', height: '100%' }, animatedStyle]}>
        <LinearGradient
          colors={['transparent', 'rgba(255, 255, 255, 0.3)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: '100%', height: '100%' }}
        />
      </Animated.View>
    </View>
  );
};

const SkeletonFeaturedDish = () => (
  <View style={styles.dishItem}>
    <View>
      <ShimmerEffect width={150} height={20} style={{ marginLeft: 25, borderRadius: 4 }} />
      <View style={styles.button}>
        <ShimmerEffect width={100} height={20} style={{ borderRadius: 25 }} />
      </View>
    </View>
    <ShimmerEffect width={160} height={160} style={{ borderRadius: 100, marginLeft: 15 }} />
  </View>
);

const SkeletonFoodItem = () => (
  <View style={styles.foodItem}>
    <ShimmerEffect width={160} height={120} style={{ borderRadius: 15 }} />
    <ShimmerEffect width={140} height={20} style={{ marginTop: 5, borderRadius: 4 }} />
  </View>
);

const SkeletonCategoryItem = () => (
  <View style={styles.foodCategory}>
    <ShimmerEffect width={80} height={20} style={{ borderRadius: 20 }} />
  </View>
);

const HeaderSection = ({ userData, navigation }) => (
  <View style={styles.header}>
    <View style={styles.user}>
      <Image source={{ uri: userData.avatar }} style={styles.profileImage}/>
      <View>
        <Text style={styles.greeting}>Chúc một ngày tốt lành!</Text>
        <Text style={styles.username}>{userData.name}</Text>
      </View>
    </View>
    <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
      <Ionicons name="notifications-outline" style={styles.notification} />
    </TouchableOpacity>
  </View>
);

const FeaturedDishSection = ({ recipe, navigation }) => (
  <View style={styles.dishItem}>
    <View>
      <Text style={styles.dishName}>{recipe?.title || "Loading..."}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => recipe && navigation.navigate('FoodDetail', { recipes: recipe })}
      >
        <Text style={styles.buttonText}>Tìm hiểu ngay</Text>
        <MaterialCommunityIcons name="arrow-right-thin" style={styles.icon} />
      </TouchableOpacity>
    </View>
    <Image source={require('../assets/bunbohue.png')} style={styles.dishImage} />
  </View>
);

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryRecipes, setCategoryRecipes] = useState([]);
  const flatListRef = useRef(null);
  const [ userData, setUserData ] = useState({});
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // console.log('Fetching profile...')
        const profileData = await get('/auth/profile'); // Lấy thông tin người dùng
        setUserData(profileData); // Cập nhật thông tin người dùng vào state
        // console.log('Profile data:', profileData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [recipesData, categoriesData] = await Promise.all([
        getRecipesInHomepage(),
        getAllCategories(),
      ]);
      if (recipesData) setRecipes(recipesData);
      if (categoriesData) setCategories(categoriesData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategoryRecipes = async () => {
      if (selectedCategory) {
        const data = await getRecipesByCategory(selectedCategory._id);
        setCategoryRecipes(data.recipes);
      }
    };
    fetchCategoryRecipes();
  }, [selectedCategory]);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    flatListRef.current?.scrollToIndex({
      index: 3,
      animated: true,
      viewPosition: 0
    });
  };

  const renderFoodItem = ({ item }) => (
    <TouchableOpacity
      style={styles.foodItem}
      onPress={() => navigation.navigate('FoodDetail', { recipes: item })}
    >
      <Image
      source={{ uri: item.image }}
      style={[styles.glassEffect, styles.foodImage]}
    />
      <Text style={styles.foodName}>{item.title}</Text>
    </TouchableOpacity>
  );

  // Hàm render item cho danh sách thể loại món ăn
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.foodCategory,
        selectedCategory?._id === item._id && styles.selectedCategory
      ]}
      onPress={() => handleCategoryPress(item)}
    >
      <Text style={[
        styles.foodCategoryText,
        selectedCategory?._id === item._id && styles.selectedCategoryText
      ]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderCategoryRecipe = ({ item }) => (
    <TouchableOpacity
      style={styles.foodItem}
      onPress={() => navigation.navigate('FoodDetail', { recipes: item })}
    >
      <Image
        source={{ uri: item.image }}
        style={[styles.glassEffect, styles.foodImage]}
      />
      <Text style={styles.foodName}>{item.title}</Text>
    </TouchableOpacity>
  );

  const sections = [
    { type: 'header' },
    { type: 'featured' },
    { type: 'recipes' },
    { type: 'categories' }
  ];

  const renderSection = ({ item }) => {
    switch (item.type) {
      case 'header':
        return <HeaderSection userData={userData} navigation={navigation} />;
      case 'featured':
        return <FeaturedDishSection recipe={recipes[0]} navigation={navigation} />;
      case 'recipes':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hôm nay nấu gì?</Text>
            <FlatList
              data={recipes}
              keyExtractor={(item) => item._id?.toString()}
              renderItem={renderFoodItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.foodList}
            />
          </View>
        );
      case 'categories':
        return (
          <View style={styles.section}>
            <View style={styles.categoryHeader}>
              <Text style={styles.sectionTitle}>Thể loại phổ biến</Text>
            </View>
            <FlatList
              data={categories}
              keyExtractor={(item, id) => id.toString()}
              renderItem={renderCategoryItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.foodCategories}
            />
            {selectedCategory && (
              <View style={styles.categoryRecipes}>
                <Text style={styles.categoryTitle}>Món ăn {selectedCategory.name}</Text>
                <FlatList
                  data={categoryRecipes}
                  keyExtractor={(item) => item._id.toString()}
                  renderItem={renderCategoryRecipe}
                  numColumns={2}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.categoryRecipesList}

                />
              </View>
            )}
          </View>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            {/* Header skeleton */}
            <View style={styles.user}>
              <ShimmerEffect width={60} height={60} style={{ borderRadius: 30 }} />
              <View style={{ marginLeft: 10 }}>
                <ShimmerEffect width={100} height={15} style={{ marginTop: 10, borderRadius: 4 }} />
                <ShimmerEffect width={80} height={25} style={{ marginTop: 5, borderRadius: 4 }} />
              </View>
            </View>
            <ShimmerEffect width={25} height={25} style={{ borderRadius: 4 }} />
          </View>

          <SkeletonFeaturedDish />

          <View style={styles.section}>
            <ShimmerEffect width={150} height={20} style={{ borderRadius: 4 }} />
            <View style={[styles.foodList, { flexDirection: 'row' }]}>
              {[1, 2, 3].map((_, index) => (
                <SkeletonFoodItem key={index} />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.categoryHeader}>
              <ShimmerEffect width={150} height={20} style={{ borderRadius: 4 }} />
              <ShimmerEffect width={80} height={20} style={{ borderRadius: 4 }} />
            </View>
            <View style={[styles.foodCategories, { flexDirection: 'row' }]}>
              {[1, 2, 3, 4].map((_, index) => (
                <SkeletonCategoryItem key={index} />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={sections}
        renderItem={renderSection}
        keyExtractor={(item, index) => item.type + index}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        getItemLayout={(data, index) => ({
          length: 400, // Approximate height of each section
          offset: 400 * index,
          index,
        })}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5edea',
    paddingBottom:80,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontFamily: 'Cursive',
  },
  username: {
    fontSize: 20,
    marginLeft: 10,
    fontStyle: 'italic',
    color: '#881415',
    fontFamily: 'Cursive',
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
    paddingHorizontal: 10,
    borderRadius: 25,
    flexDirection: 'row',
    marginLeft: 15,
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    marginLeft: 2,
    color: '#881415',
  },
  buttonText: {
    color: '#881415',
    fontWeight: 'bold',
    marginTop: 1,
    fontFamily: 'Cursive',
  },
  dishItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#881415',
    marginHorizontal: 15,
    paddingVertical: 18,
    borderRadius: 13,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 2 },
    shadowOpacity: 0.5,
  },
  dishImage: {
    width: 190,
    height: 180,
    right : 20,
    shadowColor: '#ffffff',
    shadowOffset: { width: 5, height: 2 },
    shadowOpacity: 0.3,
  },
  dishName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20,
    fontFamily: 'Cursive',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    fontFamily: 'Cursive',
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
    boderColor: '#881415',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  glassEffect: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  foodName: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '300',
    color: '#881413',
    textAlign: 'center',
    fontFamily: 'Cursive',
  },
  foodCategories: {
    flexDirection: 'row',
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
    color: 'black',
    fontFamily: 'Cursive',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Căn giữa theo chiều dọc
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#881415',
    fontFamily: 'Cursive',
    paddingVertical: 10,
  },
  selectedCategory: {
    backgroundColor: '#881415',
  },
  selectedCategoryText: {
    color: 'white',
  },
  categoryRecipes: {
    marginTop: 10,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryRecipesList: {
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
});

export default HomeScreen;
