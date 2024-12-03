import axios from 'axios';
import Config from 'react-native-config';

// Sử dụng các biến môi trường từ .env để cấu hình URL API
const apiUrl = Config.API_URL;

export const getRecipesInHomepage = async () => {
  try {
    const res = await axios.get(`http://${apiUrl}:3001/recipe`);
    
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
