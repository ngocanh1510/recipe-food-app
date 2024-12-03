import express from "express"
import { getAllRecipes, getRecipesInHomepage,addRecipe,editRecipe,deleteRecipe, toggleLikeRecipe, toggleSaveRecipe, commentOnRecipe, deleteCommentFromRecipe, getNotifications, markNotificationAsRead } from '../controllers/recipe-controller.js'
import authMiddleware from "../middlewares/auth-middlewares.js";

const RecipeRouter = express.Router();
    RecipeRouter.get("/",getRecipesInHomepage);
    RecipeRouter.get("/all",getAllRecipes);
    // RecipeRouter.get("/search",getSearchRecipes);
    RecipeRouter.post("/", addRecipe);
    RecipeRouter.put("/:id", editRecipe);
    RecipeRouter.delete("/:id", deleteRecipe);

    RecipeRouter.post('/recipes/:id/toggle-like', authMiddleware, toggleLikeRecipe);
    RecipeRouter.post('/recipes/:id/toggle-save', authMiddleware, toggleSaveRecipe);
    RecipeRouter.post('recipes/:id/comments', authMiddleware, commentOnRecipe);
    RecipeRouter.delete('/recipes/:id/comments/:commentId', authMiddleware, deleteCommentFromRecipe);
    RecipeRouter.get('/notifications/:userId', authMiddleware, getNotifications);
    RecipeRouter.patch('/notifications/:id/read', authMiddleware, markNotificationAsRead);

export default RecipeRouter;
