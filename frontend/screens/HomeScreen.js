import React from 'react';
import { getAllCategories, getRecipesInHomepage, getRecipesByCategory } from '../src/api/api';
import { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
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

const HomeScreen = ({ navigation }) => {
  // const { userData } = useUser();
  const [ userData, setUserData ] = useState();

  const [categories,setCategories]=useState([])
  const [recipes, setRecipes] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  // const [username, setUsername] = useState('Tiến Đạt');
  // const [avatar, setAvatar] = useState('https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-1/469007200_1963875310783527_4976491389156393719_n.jpg?stp=c0.0.721.721a_dst-jpg_s480x480&_nc_cat=111&ccb=1-7&_nc_sid=50d2ac&_nc_eui2=AeGFftM_sBs1xboRaFaJexvV0ZQ2SC-wFTjRlDZIL7AVOPvouQlhLN4VAL8qEuG8pi5JWAZK4SKT0lkX22K7nAwj&_nc_ohc=rgajlr2BuqYQ7kNvgGz_wM2&_nc_zt=24&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=A2QiW-wz_Kc0dnt39CmRlkp&oh=00_AYB8-WICBIcigd_Sm6kGG_f3TlcRvo0fR2uixIQMu2Yc6A&oe=67566C0D')
  // const image_path = '../assets/bunbo.png'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryRecipes, setCategoryRecipes] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // console.log('Fetching profile...')
        const profileData = await get('/auth/profile'); // Lấy thông tin người dùng
        setUserData(profileData); // Cập nhật thông tin người dùng vào state
        // console.log('Profile data:', profileData);
        console.log(userData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

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

  useEffect(() => {
    const fetchCategoryRecipes = async () => {
      if (selectedCategory) {
        setIsLoading(true);
        const data = await getRecipesByCategory(selectedCategory._id);
        setCategoryRecipes(data.recipes);
        setIsLoading(false);
      }
      console.log(categoryRecipes);

    };
    fetchCategoryRecipes();
  }, [selectedCategory]);

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
      onPress={() => setSelectedCategory(item)}
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
      <ScrollView 
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
    color: 'black',
    fontFamily: 'Cursive',
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
    fontFamily: 'Cursive',
  },
  selectedCategory: {
    backgroundColor: '#881415',
  },
  selectedCategoryText: {
    color: 'white',
  },
  categoryRecipes: {
    marginTop: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#881415',
    marginBottom: 10,
    fontFamily: 'Cursive',
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default HomeScreen;