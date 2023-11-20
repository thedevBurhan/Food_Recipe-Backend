import express from "express";
import {
  generateNewRecipeData,
  getAllRecipeData,
  getSpecificUserRecipeData,
  deleteRecipeDatas,
  updateRecipeDatas,
} from "../Recipe/Recipe.js";
import multer from "multer";

const upload = multer({ dest: 'uploads/' })
//initalize the router
const router = express.Router();


// To add new Recipe Data
router.post("/",upload.single('image'), generateNewRecipeData);
// To get all Recipe
router.get("/allRecipeData", getAllRecipeData);
// To get Recipe For specific User
router.get("/specificUser/:id", getSpecificUserRecipeData);
// To Edit Recipe data
router.put("/edit/:id", updateRecipeDatas);

// to delete a Specidic Recipe data
router.delete("/deleteRecipeData/:id", deleteRecipeDatas);

export const RecipedataRouter = router;
