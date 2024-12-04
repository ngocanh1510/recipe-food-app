import express from "express";
import authMiddleware from "../middlewares/auth-middlewares.js";
import { getAllRecipes, getRecipesInHomepage,addRecipe,editRecipe,deleteRecipe, toggleLikeRecipe, toggleSaveRecipe, commentOnRecipe, deleteCommentFromRecipe, getNotifications, markNotificationAsRead, getRecipesByCategory,getSavedRecipes,getSavedRecipesByUserId } from '../controllers/recipe-controller.js'


const RecipeRouter = express.Router();
    RecipeRouter.get("/",getRecipesInHomepage);
    RecipeRouter.get("/category/:categoryId",getRecipesByCategory);
    RecipeRouter.get("/all",getAllRecipes);
    RecipeRouter.get("/savedRecipes",getSavedRecipes)
    RecipeRouter.get("/savedRecipes/:userId", getSavedRecipesByUserId)
    // RecipeRouter.get("/search",getSearchRecipes);
    RecipeRouter.post("/", addRecipe);
    RecipeRouter.put("/:id", editRecipe);
    RecipeRouter.delete("/:id", deleteRecipe);
    RecipeRouter.post('/:id/toggle-like', authMiddleware, toggleLikeRecipe);
    RecipeRouter.post('/:id/toggle-save', authMiddleware, toggleSaveRecipe);
    RecipeRouter.post('/:id/comments', authMiddleware, commentOnRecipe);
    RecipeRouter.delete('/:id/comments/:commentId', authMiddleware, deleteCommentFromRecipe);
    RecipeRouter.get('/notifications/:userId', authMiddleware, getNotifications);
    RecipeRouter.patch('/notifications/:id', authMiddleware, markNotificationAsRead);

export default RecipeRouter;
