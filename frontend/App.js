import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, AuthContext } from './screens/AuthContext.js';
import NotificationsScreen from './screens/NotificationScreen.js'; // Import NotificationsScreen
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import CreateRecipeScreen from './screens/CreateRecipeScreen.js';
import EditProfileScreen from './screens/EditProfileScreen.js';
import FoodDetail from './screens/FoodDetail.js'; // Import màn hình FoodDetail
import NoteScreen from './screens/NoteScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import SearchScreen from './screens/SearchScreen.js';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen.js';
import WelcomeScreen from './screens/WelcomeScreen.js';
import { useContext } from 'react';

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
const ProfileStack = createStackNavigator();
const ProfileNavigator = () => (
  <ProfileStack.Navigator screenOptions={{headerShown:false}}>
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
    <ProfileStack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{ title: 'Chinh sua ho so' }}
    />
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
  </CreateRecipeStack.Navigator>
);

// **MainBottom: Điều hướng Tab chính của ứng dụng**
const MainBottom = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#881415',
        tabBarInactiveTintColor: 'black',

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
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="search1" size={28} color={color} />,
        }}
      />
      <Tab.Screen
        name="Tạo công thức"
        component={CreateRecipeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <AntDesign name="pluscircleo" size={28} color={color} />,
        }}
      />

      <Tab.Screen
        name="Sổ tay"
        component={FavoriteScreen}
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
  return (
    <NavigationContainer>
      {/* {isAuthenticated ? <MainBottom /> : <AuthStack />} */}
      <MainBottom />
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
