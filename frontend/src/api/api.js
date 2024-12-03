import axios from 'axios';
import dotenv from "dotenv";

dotenv.config();

export const getRecipesInHomepage = async () => {
  try {
    const res = await axios.get(`http://${API_BASE_URL}:3001/recipe`);
    
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
