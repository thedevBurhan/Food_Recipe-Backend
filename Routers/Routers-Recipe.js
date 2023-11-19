import express from "express";
import {
  generateNewRecipeData,
  getAllRecipeData,
  getSpecificUserRecipeData,
  deleteRecipeDatas,
  updateRecipeDatas,
} from "../Recipe/Recipe.js";
import multer from "multer";
import path from "path";
//initalize the router
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/img/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// To add new Recipe Data
router.post("/", generateNewRecipeData);
// To get all Recipe
router.get("/allRecipeData", getAllRecipeData);
// To get Recipe For specific User
router.get("/specificUser/:id", getSpecificUserRecipeData);
// To Edit Recipe data
router.put("/edit/:id", upload.single("image"), updateRecipeDatas);

// to delete a Specidic Recipe data
router.delete("/deleteRecipeData/:id", deleteRecipeDatas);

export const RecipedataRouter = router;
