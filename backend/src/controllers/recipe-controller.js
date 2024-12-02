import jwt from "jsonwebtoken";
import  UserModel from "../models/User.js";
import RecipeModel from "../models/Recipe.js";
import mongoose from "mongoose";
import CategoryModel from "../models/Categories.js";

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

  export const addRecipe = async (req, res) => {

    
      const {
        userOwner,
        title,
        description,
        categogiesId,
        ingredients,
        steps,
        image
      } = req.body
      if (!userOwner) {
        return res.status(400).json({
          status: false,
          message: "User ID is required",
        });
      }
  
      // Check if user id is in database
      const checkUserId = await UserModel.findById(userOwner);
      if (!checkUserId) {
        return res.status(404).json({
          status: false,
          message: "User ID Not Found!",
        });
      }
      if (!categogiesId) {
        return res.status(400).json({
          status: false,
          message: "Categori is required",
        });
      }
      const checkCategoryId = await CategoryModel.findById(categogiesId);
      if (!checkCategoryId) {
        return res.status(404).json({
          status: false,
          message: "Categories ID Not Found!",
        });
      }
  
  
      if (
        !title || title.trim() === "" ||
        !description || description.trim() === ""||
        !Array.isArray(ingredients) || ingredients.length === 0 ||
        !Array.isArray(steps) || steps.length === 0

      ) {
        return res.status(422).json({ message: "invalid input" });
      }
  
      // Check if file is empty
      if (!image) {
        return res.status(400).json({
          status: false,
          message: 'Photo is required!'
        })
      }

      // Check if file size > 2MB
      if (image.size > 2000000) {
        return res.status(400).json({
          status: false,
          message: 'File must be less than 2MB!'
        })
      }

  
      let recipe;
      try {
        recipe = new RecipeModel({
          userOwner,
          title,
          description,
          categogiesId,
          ingredients,
          steps,
          image
        });
    
        await recipe.save();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to add recipe", error: err.message });
    }
  
    return res.status(201).json({ message: "Recipe added successfully", recipe })
    };
