import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './screens/AuthContext.js';
import CreateRecipeScreen from './screens/CreateRecipeScreen.js';
import EditProfileScreen from './screens/EditProfileScreen.js';
import NoteScreen from './screens/NoteScreen.js';
import FoodDetail from './screens/FoodDetail.js'; // Import màn hình FoodDetail
import ForgotPasswordScreen from './screens/ForgotPasswordScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import NotificationsScreen from './screens/NotificationScreen.js'; // Import NotificationsScreen
import ProfileScreen from './screens/ProfileScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import SearchScreen from './screens/SearchScreen.js';
import WelcomeScreen from './screens/WelcomeScreen.js';
import RecipeForm from './screens/RecipeForm.js';
import RecipeDetail from './screens/RecipeDetail.js';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';

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
    <CreateRecipeStack.Screen
      name="RecipeForm"
      component={RecipeForm}
      options={{ title: 'Chỉnh sửa công thức' }}
    />
    <CreateRecipeStack.Screen
      name="RecipeDetail"
      component={RecipeDetail}
      options={{ title: 'Chi tiết công thức' }}
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
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name={focused ? "pluscircle" : "pluscircleo"} size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Sổ tay"
        component={NoteScreen}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="book" size={28} color={color} />,
        }}
      />
      <Tab.Screen
        name="Hồ sơ"
        component={ProfileNavigator}
        options={{
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

async function initDatabase(db) {
  const DATABASE_VERSION = 1;
  
  const { user_version: currentDbVersion } = await db.getFirstAsync('PRAGMA user_version');
  
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      
      CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        image TEXT,
        servings INTEGER,
        cookingTime TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS ingredients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe_id INTEGER,
        name TEXT,
        amount TEXT,
        FOREIGN KEY (recipe_id) REFERENCES recipes (id)
      );

      CREATE TABLE IF NOT EXISTS nutrition_values (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe_id INTEGER,
        carbs TEXT,
        protein TEXT,
        calories TEXT,
        fat TEXT,
        FOREIGN KEY (recipe_id) REFERENCES recipes (id)
      );
    `);
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export default function App() {
  return (
    <SQLiteProvider databaseName="recipes.db" onInit={initDatabase}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SQLiteProvider>
  );
}