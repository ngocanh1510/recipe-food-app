// 22520073-Phan Thị Ngọc Ánh
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, AuthContext } from './screens/AuthContext.js';
import NotificationsScreen from './screens/NotificationScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import FavoriteScreen from './screens/Book.js';
import ProfileScreen from './screens/ProfileScreen.js';
import { SimpleLineIcons, MaterialIcons, FontAwesome,Fontisto, AntDesign } from '@expo/vector-icons';
import { View } from 'react-native';
import CategoryScreen from './screens/CategoryScreen.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 22520073-Phan Thị Ngọc Ánh
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);
const NotifiStack=()=>(
  <Stack.Navigator>
    <Stack.Screen name="home" component={HomeScreen} options={{headerShown:false}}/>
    <Stack.Screen name="THÔNG BÁO" component={NotificationsScreen} options={{headerBackTitle:''}}/>
  </Stack.Navigator>
)
const MainBottom = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#881415',
        tabBarInactiveTintColor: 'black',
        
      }}
    >
      <Tab.Screen
  name="Home"
  component={NotifiStack}
  options={() => ({
    headerShown: false,
    tabBarIcon: ({ color }) => <SimpleLineIcons name="home" size={30} color={color} />,
  })}
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
          tabBarIcon: ({ color }) => (
            <View>
              <AntDesign name="book" size={30} color={color} />
              )
            </View>
          ),
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

const AppNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {isAuthenticated ? <MainBottom /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
