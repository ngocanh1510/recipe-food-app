import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, AuthContext } from './screens/AuthContext.js';
import NotificationsScreen from './screens/NotificationScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import FoodDetail from './screens/FoodDetail.js'; // Import màn hình FoodDetail
import FavoriteScreen from './screens/Book.js';
import ProfileScreen from './screens/ProfileScreen.js';
import CategoryScreen from './screens/CategoryScreen.js';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen.js';
import WelcomeScreen from './screens/WelcomeScreen.js';
import { SimpleLineIcons, Fontisto, AntDesign } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// **AuthStack: Định nghĩa các màn hình liên quan đến xác thực**
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>
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
  </Stack.Navigator>
);

// **MainBottom: Điều hướng Tab chính của ứng dụng**
const MainBottom = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#881415',
        tabBarInactiveTintColor: 'black',
      }}
    >
      <Tab.Screen
        name="Trang chủ"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <SimpleLineIcons name="home" size={30} color={color} />,
        }}
      />
      <Tab.Screen
        name="TÌM KIẾM"
        component={CategoryScreen}
        options={{
          tabBarIcon: ({ color }) => <Fontisto name="world-o" size={28} color={color} />,
        }}
      />
      <Tab.Screen
        name="SỔ TAY"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="book" size={30} color={color} />,
        }}
      />
      <Tab.Screen
        name="HỒ SƠ"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="user" size={30} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

// **AppNavigator: Điều hướng chính dựa trên trạng thái xác thực**
const AppNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {isAuthenticated ? <MainBottom /> : <AuthStack />}
    </NavigationContainer>
  );
};

// **Ứng dụng chính**
export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
