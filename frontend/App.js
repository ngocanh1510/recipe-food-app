import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import { UserProvider } from './context/UserContext';
import AboutScreen from './screens/AboutScreen';
import AchievementsScreen from './screens/AchievementsScreen';
import { AuthContext, AuthProvider } from './screens/AuthContext.js';
import CookingStepsScreen from './screens/CookingStepsScreen.js'; // Import CookingStepsScreen
import CreateRecipeScreen from './screens/CreateRecipeScreen.js';
import EditProfileScreen from './screens/EditProfileScreen.js';
import FavoritesScreen from './screens/FavoritesScreen';
import FoodDetail from './screens/FoodDetail.js';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen.js';
import HelpScreen from './screens/HelpScreen';
import HistoryScreen from './screens/HistoryScreen';
import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import NoteScreen from './screens/NoteScreen.js';
import NotificationsScreen from './screens/NotificationScreen.js';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import ProfileScreen from './screens/ProfileScreen.js';
import RecipeDetail from './screens/RecipeDetail.js';
import RecipeForm from './screens/RecipeForm.js';
import RegisterScreen from './screens/RegisterScreen.js';
import SearchScreen from './screens/SearchScreen.js';
import SettingsScreen from './screens/SettingsScreen';
import WelcomeScreen from './screens/WelcomeScreen.js';
import EditRecipeScreen from './screens/EditRecipeScreen.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// **AuthStack: Định nghĩa các màn hình liên quan đến xác thực**
const StackAuth = createStackNavigator();

const AuthStack = () => (
  <StackAuth.Navigator screenOptions={{ headerShown: false }}>
    <StackAuth.Screen name="Welcome" component={WelcomeScreen} />
    <StackAuth.Screen name="Login" component={LoginScreen} />
    <StackAuth.Screen name="Register" component={RegisterScreen} />
    <StackAuth.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </StackAuth.Navigator>
);

// **HomeStack: Điều hướng trong HomeScreen**
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="FoodDetail"
      component={FoodDetail}
      options={{
        headerBackTitle: '',
        title: 'Chi tiết món ăn',
      }}
    />
      <Stack.Screen
      name="CookingSteps"
      component={CookingStepsScreen}
      options={{
        headerBackTitle: '',
        title: 'Các bước nấu ăn',
      }}
    />
    <Stack.Screen
      name="Notifications" // Thêm màn hình Notifications
      component={NotificationsScreen}
      options={{
        headerBackTitle: '',
        title: 'Thông báo',
      }}
    />
  </Stack.Navigator>
);
const SearchStack = createStackNavigator();

const SearchNavigator = () => (
  <SearchStack.Navigator screenOptions={{ headerShown: false }}>
    <SearchStack.Screen
      name="Search"
      component={SearchScreen}
      options={{ title: 'Tìm kiếm' }}
    />
    <SearchStack.Screen
      name="FoodDetail"
      component={FoodDetail}
      options={{ title: 'Chi tiết món ăn' }}
    />
    <Stack.Screen
      name="CookingSteps"
      component={CookingStepsScreen}
      options={{
        headerBackTitle: '',
        title: 'Các bước nấu ăn',
      }}
    />
  </SearchStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileNavigator = () => (
  <ProfileStack.Navigator screenOptions={{headerShown:false}}>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
    <ProfileStack.Screen name="Favorites" component={FavoritesScreen} />
    <ProfileStack.Screen name="History" component={HistoryScreen} />
    <ProfileStack.Screen name="Achievements" component={AchievementsScreen} />
    <ProfileStack.Screen name="Settings" component={SettingsScreen} />
    <ProfileStack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
    <ProfileStack.Screen name="Help" component={HelpScreen} />
    <ProfileStack.Screen name="About" component={AboutScreen} />
  </ProfileStack.Navigator>
);

const CreateRecipeStack = createStackNavigator();
const CreateRecipeNavigator = () => (
  <CreateRecipeStack.Navigator screenOptions={{ headerShown: false }}>
    <CreateRecipeStack.Screen
      name="CreateRecipe"
      component={CreateRecipeScreen}
      options={{ title: 'Tạo công thức' }}
    />
    <CreateRecipeStack.Screen
      name="RecipeForm"
      component={RecipeForm}
      options={{title: 'Bước thực hiện' }}
    />
    <CreateRecipeStack.Screen
      name="RecipeDetail"
      component={RecipeDetail}
      options={{ title: 'Nguyên liệu' }}
    />
  </CreateRecipeStack.Navigator>
);
const NoteStack = createStackNavigator();
const NoteNavigator = () => (
  <NoteStack.Navigator>
    <NoteStack.Screen 
      name="Note" 
      component={NoteScreen}
      options={{ headerShown: false }} 
    />
    <NoteStack.Screen 
      name="RecipeDetail" 
      component={RecipeDetail}
      options={{
        title: 'Chỉnh sửa công thức',
        headerStyle: {
          backgroundColor: '#FF6B6B',
        },
        headerTintColor: '#fff',
        headerShown: false,
      }} 
    />
    <NoteStack.Screen
      name="CookingSteps"
      component={CookingStepsScreen}
      options={{
        headerBackTitle: '',
        title: 'Các bước nấu ăn',
      }}
    />
    <NoteStack.Screen
      name="FoodDetail"
      component={FoodDetail}
      options={{
        title: 'Xem công thức',
        headerStyle: {
          backgroundColor: '#FF6B6B',
        },
        headerTintColor: '#fff',
      }}
    />
  </NoteStack.Navigator>
);
// **MainBottom: Điều hướng Tab chính của ứng dụng**
const MainBottom = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#881415',
        tabBarInactiveTintColor: 'black',
        headerStyle: {
          backgroundColor: '#f8f1f1',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          color: '#000',
          textAlign: 'left',
          fontSize: 28,
          color: '#881415',
          fontWeight: 'bold',
        },
        headerTitleAlign: 'left',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: 'transparent',
          bottom: 30,
          position: 'absolute',
          marginHorizontal: 20,
          borderRadius: 15,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          height: 65,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Tab.Screen
        name="Trang chủ"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => <AntDesign name="home" size={28} color={color} />,
        }}
      />
      <Tab.Screen
        name="Tìm kiếm"
        component={SearchNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <AntDesign name="search1" size={28} color={color} />,
        }}
      />
      <Tab.Screen
        name="Tạo công thức"
        component={CreateRecipeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name={focused ? "pluscircle" : "pluscircleo"} size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Sổ tay"
        component={NoteNavigator}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="book" size={28} color={color} />,
        }}
      />
      <Tab.Screen
        name="Hồ sơ"
        component={ProfileNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <AntDesign name="user" size={28} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

// **AppNavigator: Điều hướng chính dựa trên trạng thái xác thực**
const AppNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated)
  return (
    <NavigationContainer>
      {isAuthenticated ? <MainBottom /> : <AuthStack />}
      {/* <MainBottom /> */}
    </NavigationContainer>
  );
};

export default function App() {
  return (
      <AuthProvider>
        <UserProvider>
            <AppNavigator />
        </UserProvider>
      </AuthProvider>
  );
}