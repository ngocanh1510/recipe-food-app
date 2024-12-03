import express from "express"
import { getAllRecipes, getRecipesInHomepage,addRecipe} from '../controllers/recipe-controller.js'
const RecipeRouter = express.Router();
    RecipeRouter.get("/",getRecipesInHomepage);
    RecipeRouter.get("/all",getAllRecipes);
    // RecipeRouter.get("/search",getSearchRecipes);
    RecipeRouter.post("/", addRecipe);
    RecipeRouter.put("/:id", editRecipe);
    RecipeRouter.delete("/:id", deleteRecipe);
export default RecipeRouter;