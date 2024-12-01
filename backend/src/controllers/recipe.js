import jwt from "jsonwebtoken";
import  UserModel from "../models/User.js";
import RecipeModel from "../models/Recipe.js";

export const getAllRecipes = async (req, res, next) => {
    let recipes;
  
    try {
      recipes = await RecipeModel.find();
    } catch (err) {
      return console.log(err);
    }
  
    if (!recipes) {
      return res.status(500).json({ message: "Request Failed" });
    }
    return res.status(200).json({ recipes });
  };

  export const getRecipesInHomepage = async (req, res, next) => { 
    let recipes;
  
    try {
      recipes = await RecipeModel.find().limit(4);
    } catch (err) {
      return console.log(err);
    }
  
    if (!recipes || recipes.length === 0) {
      return res.status(500).json({ message: "Request Failed" });
    }
  
    return res.status(200).json({ recipes });
  };