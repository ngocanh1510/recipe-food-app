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

export const getSavedRecipes = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/recipe/savedRecipes`);
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


// export const addRecipe = async (recipe) => {
//   const response = await fetch(`${BASE_URL}/add`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(recipe),
//   });
//   const data = await response.json();
//   if (!response.ok) throw new Error(data.message || 'Failed to add recipe');
//   return data;
// };


// export const getImage = async () => {
//   try {
//     console.log(API_URL);
//     const res = await axios.get(`http://${API_URL}:3001/api/images/6750924bcd6f8b82f79c7ab5`);
//     if (res.status === 200) {
//       return res.data;
//     } else {
//       console.error("Lỗi API:", res.status);
//       return null;
//     }
//   } catch (err) {
//     console.error("Lỗi khi gửi yêu cầu API:", err);
//     return null;
//   }
// };
