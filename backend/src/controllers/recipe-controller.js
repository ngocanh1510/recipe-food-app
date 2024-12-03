import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";
import RecipeModel from "../models/Recipe.js";
import mongoose from "mongoose";
import CategoryModel from "../models/Categories.js";
import sendNotification from "../utils/sendNotification.js";

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

    
export const editRecipe = async (req, res) => {
  try {
    const { id } = req.params; 
    const { title, description, categoriesId, ingredients, steps, image } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: 'Invalid Recipe ID'
      });
    }

    const existingRecipe = await RecipeModel.findById(id);
    if (!existingRecipe) {
      return res.status(404).json({
        status: false,
        message: 'Recipe not found'
      });
    }

    if (title && title !== existingRecipe.title) {
      const existingTitle = await RecipeModel.findOne({ title });
      if (existingTitle) {
        return res.status(400).json({
          status: false,
          message: 'Title already in use'
        });
      }
    }

    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (categoriesId) updateFields.categoriesId = categoriesId;
    if (ingredients) updateFields.ingredients = ingredients;
    if (steps) updateFields.steps = steps;
    if (image) updateFields.image = image;

    const updatedRecipe = await RecipeModel.findByIdAndUpdate(id, updateFields, { new: true });

    return res.status(200).json({
      status: true,
      message: 'Recipe updated successfully',
      data: updatedRecipe
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: 'Failed to update recipe',
      error: error.message
    });
  }
};


export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ tham số trong URL

    // Kiểm tra xem ID có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: 'Invalid Recipe ID'
      });
    }

    // Tìm món ăn trong cơ sở dữ liệu bằng ID
    const existingRecipe = await RecipeModel.findById(id);
    if (!existingRecipe) {
      return res.status(404).json({
        status: false,
        message: 'Recipe not found'
      });
    }

    // Xóa món ăn
    await RecipeModel.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      message: 'Recipe deleted successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: 'Failed to delete recipe',
      error: error.message
    });
  }
};

// Like/Unlike Recipe
export const toggleLikeRecipe = async (req, res) => {
  const { id } = req.params; // Recipe ID
  const { userId } = req.body; // ID của người thực hiện hành động

  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ status: false, message: "Không tồn tại Recipe ID hoặc User ID" });
  }

  try {
      const recipe = await RecipeModel.findById(id);
      if (!recipe) {
          return res.status(404).json({ status: false, message: "Không tìm thấy Recipe" });
      }

      // Kiểm tra trạng thái hiện tại: đã like hay chưa
      const hasLiked = recipe.likes.includes(userId);

      if (hasLiked) {
          // Nếu đã like -> unlike
          recipe.likes = recipe.likes.filter((like) => like.toString() !== userId);
      } else {
          // Nếu chưa like -> like
          recipe.likes.push(userId);

          // Gửi thông báo đến người tạo recipe nếu chưa like
          const message = `${userId} đã thích công thức "${recipe.title} của bạn".`;
          sendNotification({
              recipient: recipe.userOwner,
              sender: userId,
              type: "like",
              recipeId: id,
              message
          });
      }

      await recipe.save();

      res.status(200).json({
          status: true,
          message: hasLiked ? "Recipe unliked" : "Recipe liked",
          recipe
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, message: "Failed to toggle like recipe" });
  }
};

// Save/Unsave Recipe
export const toggleSaveRecipe = async (req, res) => {
  const { id } = req.params; // Recipe ID
  const { userId } = req.body; // ID của người thực hiện hành động

  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ status: false, message: "Không tồn tại Recipe ID hoặc User ID" });
  }

  try {
      const user = await UserModel.findById(userId);
      if (!user) {
          return res.status(404).json({ status: false, message: "User not found" });
      }

      // Kiểm tra trạng thái hiện tại: đã save hay chưa
      const hasSaved = user.savedRecipes.includes(id);

      if (hasSaved) {
          // Nếu đã save -> unsave
          user.savedRecipes = user.savedRecipes.filter((recipeId) => recipeId.toString() !== id);
      } else {
          // Nếu chưa save -> save
          user.savedRecipes.push(id);

          // Gửi thông báo đến người tạo recipe nếu chưa save
          const recipe = await RecipeModel.findById(id);
          if (recipe) {
              const message = `${userId} đã lưu công thức "${recipe.title} của bạn".`;
              sendNotification({
                  recipient: recipe.userOwner,
                  sender: userId,
                  type: "save",
                  recipeId: id,
                  message
              });
          }
      }

      await user.save();

      res.status(200).json({
          status: true,
          message: hasSaved ? "Recipe unsaved" : "Recipe saved",
          savedRecipes: user.savedRecipes
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, message: "Failed to toggle save recipe" });
  }
};

// Comment 
export const commentOnRecipe = async (req, res) => {
  const { id } = req.params; // Recipe ID
  const { userId, comment } = req.body; // User ID và nội dung comment

  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ status: false, message: "Không tồn tại Recipe ID hoặc User ID" });
  }

  if (!comment || comment.trim() === "") {
      return res.status(400).json({ status: false, message: "Comment không thể bỏ trống" });
  }

  try {
      const recipe = await RecipeModel.findById(id);
      if (!recipe) {
          return res.status(404).json({ status: false, message: "Recipe not found" });
      }

      // Thêm comment vào công thức
      const newComment = {
          user: userId,
          text: comment,
          createdAt: new Date()
      };
      recipe.comments.push(newComment);

      await recipe.save();

      // Gửi thông báo đến người tạo công thức
      const message = `${userId} đã bình luận công thức "${recipe.title} của bạn": "${comment}".`;
      sendNotification({
          recipient: recipe.userOwner,
          sender: userId,
          type: "comment",
          recipeId: id,
          message
      });

      res.status(201).json({
          status: true,
          message: "Comment added successfully",
          comments: recipe.comments
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, message: "Failed to add comment", error: err.message });
  }
};

// Delete Comment
export const deleteCommentFromRecipe = async (req, res) => {
  const { id, commentId } = req.params; // Recipe ID và Comment ID
  const { userId } = req.body; // User ID của người thực hiện xóa

  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ status: false, message: "Không tồn tại Recipe ID hoặc User ID" });
  }

  try {
      const recipe = await RecipeModel.findById(id);
      if (!recipe) {
          return res.status(404).json({ status: false, message: "Recipe not found" });
      }

      // Kiểm tra comment có tồn tại không
      const commentIndex = recipe.comments.findIndex(
          (comment) => comment._id.toString() === commentId
      );
      if (commentIndex === -1) {
          return res.status(404).json({ status: false, message: "Không tìm thấy bình luận" });
      }

      // Kiểm tra quyền xóa: Chỉ người tạo comment hoặc người tạo recipe mới được xóa
      const comment = recipe.comments[commentIndex];
      if (comment.user.toString() !== userId && recipe.userOwner.toString() !== userId) {
          return res.status(403).json({ status: false, message: "Bạn không được phép xóa bình luận này" });
      }

      // Xóa comment
      recipe.comments.splice(commentIndex, 1);

      await recipe.save();

      res.status(200).json({
          status: true,
          message: "Comment deleted successfully",
          comments: recipe.comments
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, message: "Failed to delete comment", error: err.message });
  }
};

// get Notifications
export const getNotifications = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ status: false, message: "Invalid User ID" });
  }

  try {
      const notifications = await NotificationModel.find({ recipient: userId })
          .sort({ createdAt: -1 })
          .populate("sender", "username") // Lấy thông tin người gửi
          .populate("recipe", "title"); // Lấy thông tin recipe

      res.status(200).json({ status: true, notifications });
  } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, message: "Failed to get notifications" });
  }
};

// Đánh dấu đã đọc
export const markNotificationAsRead = async (req, res) => {
  const { id } = req.params; // Notification ID

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: false, message: "Invalid Notification ID" });
  }

  try {
      const notification = await NotificationModel.findById(id);
      if (!notification) {
          return res.status(404).json({ status: false, message: "Notification not found" });
      }

      notification.isRead = true;
      await notification.save();

      res.status(200).json({ status: true, message: "Notification marked as read" });
  } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, message: "Failed to mark notification as read" });
  }
};
