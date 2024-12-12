import axios from 'axios';
import { API_URL} from '../config.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL=`http://${API_URL}:3001`
export const getRecipesInHomepage = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/recipe`);
    if (res.status === 200) {
      return res.data.recipes; 
    } else {
      console.error("Lỗi API:", res.status);
      return null;
    }
  } catch (err) {
    console.error("Lỗi khi gửi yêu cầu API:", err);
    return null;
  }
};

// Dữ liệu mẫu cho saved recipes
const SAMPLE_SAVED_RECIPES = [
  {
    _id: '1',
    title: 'Phở Bò Việt Nam',
    image: 'https://cdn.tgdd.vn/Files/2022/01/25/1412805/cach-nau-pho-bo-nam-dinh-chuan-vi-thom-ngon-nhu-hang-quan-202201250230038502.jpg',
    time: '60 phút',
    difficulty: 'Trung bình'
  },
  {
    _id: '2',
    title: 'Bún Chả Hà Nội',
    image: 'https://cdn.tgdd.vn/Files/2021/08/09/1374160/cach-lam-bun-cha-ha-noi-bang-noi-chien-khong-dau-thom-ngon-chuan-vi-202108091559062485.jpg',
    time: '45 phút',
    difficulty: 'Dễ'
  }
];

// Dữ liệu mẫu cho my recipes
const SAMPLE_MY_RECIPES = [
  {
    _id: '3',
    title: 'Cơm Gà Hải Nam',
    image: 'https://cdn.tgdd.vn/Files/2021/08/09/1374160/cach-lam-com-ga-hai-nam-don-gian-tai-nha-202108091559062485.jpg',
    time: '50 phút',
    difficulty: 'Trung bình'
  },
  {
    _id: '4',
    title: 'Bánh Xèo Miền Tây',
    image: 'https://cdn.tgdd.vn/Files/2021/08/09/1374160/cach-lam-banh-xeo-mien-tay-gion-rum-thom-ngon-202108091559062485.jpg',
    time: '30 phút',
    difficulty: 'Dễ'
  }
];
export const getSavedRecipes = async () => {
  try {
    const token = await AsyncStorage.getItem('token')
    const res = await axios.get(`${BASE_URL}/recipe/savedRecipes`,{
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
  return res.data.savedRecipes;
  } catch (err) {
    console.error("Lỗi khi gửi yêu cầu API:", err);
    return null;
  }
};

export const getMyRecipes = async () => {
  try {
    const token = await AsyncStorage.getItem('token')
    const res = await axios.get(`${BASE_URL}/recipe/my`,{
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
  return res.data.recipes;
  } catch (err) {
    console.error("Lỗi khi gửi yêu cầu API:", err);
    return null;
  }
};

export const getAllRecipes = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/recipe/all`);
    if (res.status === 200) {
      return res.data.recipes; 
    } else {
      console.error("Lỗi API:", res.status);
      return null;
    }
  } catch (err) {
    console.error("Lỗi khi gửi yêu cầu API:", err);
    return null;
  }
};

export const post = async (endpoint, data) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.post(`${BASE_URL}${endpoint}`, data, 
      {
        headers,
        withCredentials: true,
      });
    return response; // Trả về response của API (ví dụ: { status, data })
  } catch (error) {
    // console.error("Error during API call:", error);
    throw error; // Ném lỗi để catch ở nơi gọi API
  }
};

export const get = async (endpoint) => {
  try {
    const token = await AsyncStorage.getItem('token'); // Lấy token từ AsyncStorage
    const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Thêm header Authorization nếu có token

    const response = await axios.get(`http://${API_URL}:3001${endpoint}`, {
      headers,
      withCredentials: true, // Đảm bảo gửi cookie nếu cần thiết
    });

    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    // console.error("Error during API call:", error);
    throw error; // Ném lỗi để catch ở nơi gọi API
  }
};

export const put = async (endpoint, data, headers = {}) => {
  try {
    const response = await axios.put(`http://${API_URL}:3001${endpoint}`, data, {
      headers: {
        // 'Content-Type': 'application/json',
        ...headers,
      },
    });
    return response.data;
  } catch (error) {
    console.error('PUT request error:', error.response?.data || error.message);
    throw new Error(error.response?.data.message || 'Lỗi khi gửi yêu cầu PUT');
  }
};

export const getAllCategories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/category/all`);
    
    if (res.status === 200) {
      return res.data.categories; 
    } else {
      console.error("Lỗi API:", res.status);
      return null;
    }
  } catch (err) {
    console.error("Lỗi khi gửi yêu cầu API:", err);
    return null;
  }
};

export const getRecipesByCategory = async (categoryId) => {
  try {
    const res = await axios.get(`${BASE_URL}/recipe/category/${categoryId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching recipes by category:', error);
    return null;
  }
};

export const addRecipe = async (recipe) => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log('Token:', token);
    if (!token) {
      throw new Error('Token không tồn tại');
    }

    console.log('Recipe payload:', recipe);

    const res = await axios.post(`${BASE_URL}/recipe/add`, recipe, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response Data:', res.data);

    return res.data;
  } catch (err) {
    console.log(err)
    console.error('Error:', err.response?.data || err.message);
    throw new Error(err.response?.data?.message || 'Failed to add recipe');
  }
};

export const editRecipe =async(recipeId)=>{
  try{
    await axios.put(`${BASE_URL}/recipe/${recipeId}`);
    alert('Công thức đã được thay đổi thành công.');
  }
  catch (error) {
    console.error('Lỗi :', error);
    alert('Có lỗi xảy ra, vui lòng thử lại sau.');
  }
}
export const deleteRecipe =async(recipeId) =>{
    try{
      await axios.delete(`${BASE_URL}/recipe/${recipeId}`);
      console.log('Công thức đã được xóa thành công');
      alert('Công thức đã được xóa thành công.');
    }
    catch (error) {
      console.error('Lỗi :', error);
      alert('Có lỗi xảy ra, vui lòng thử lại sau.');
    }
}