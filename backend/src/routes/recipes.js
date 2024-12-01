import express from "express"
import { getAllRecipes, getRecipesInHomepage} from '../controllers/recipe.js'
const RecipeRouter = express.Router();
    RecipeRouter.get("/",getRecipesInHomepage);
    RecipeRouter.get("/all",getAllRecipes);
export default RecipeRouter;