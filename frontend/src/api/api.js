import axios from "axios";

export const getRecipesInHomepage = async () => {
  try {
    const res = await axios.get("http://localhost:3001/recipe");
    if (res.status !== 200) {
      console.log("no data");
      return null;
    }
    return res.data;
  } catch (err) {
    console.log("Error while fetching recipes:", err.message);
    return null;
  }
};
