import axios from 'axios';
import { API_URL} from '../config';

export const getRecipesInHomepage = async () => {
  try {
    const res = await axios.get(`http://${API_URL}:3001/recipe`);
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
    const res = await axios.get(`http://${API_URL}:3001/recipe/savedRecipes`);
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
    const res = await axios.get(`http://${API_URL}:3001/recipe/all`);
    
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
    const response = await axios.post(`http://${API_URL}:3001${endpoint}`, data);
    return response; // Trả về response của API (ví dụ: { status, data })
  } catch (error) {
    console.error("Error during API call:", error);
    throw error; // Ném lỗi để catch ở nơi gọi API
  }
};

export const getAllCategories = async () => {
  try {
    console.log(API_URL);
    const res = await axios.get(`http://${API_URL}:3001/category/all`);
    
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
    const response = await axios.get(`http://${API_URL}:3001/recipe/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes by category:', error);
    return null;
  }
};


export const getImage = async () => {
  try {
    console.log(API_URL);
    const res = await axios.get(`http://${API_URL}:3002/api/images/6750924bcd6f8b82f79c7ab5`);
    if (res.status === 200) {
      return res.data;
    } else {
      console.error("Lỗi API:", res.status);
      return null;
    }
  } catch (err) {
    console.error("Lỗi khi gửi yêu cầu API:", err);
    return null;
  }
};
