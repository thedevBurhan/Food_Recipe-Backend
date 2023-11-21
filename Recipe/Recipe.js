import {
  Recipe,
  getAllRecipeDatas,
  updateRecipeData,
  deleteRecipeData,
} from "../Controllers/Controllers-Recipe.js";
// To Generate Recipe Data
async function generateNewRecipeData(req, res) {
  const { calories, label, totalTime, userid, ingredients } = req.body;
  const image = req.file; 
  console.log("image", image); 
  try {
    // Use the entire filename if there is no comma
    const secondFilename = image.filename.includes(',') ? image.filename.split(',')[1] : image.filename;
    console.log("secondFilename", secondFilename);

    await Recipe([{
      calories: calories,
      label: label,
      image: secondFilename,  // Assign the second filename to the image property
      totalTime: totalTime,
      ingredients: ingredients.map((ingredient) => ({
        measure: ingredient.measure,
        weight: ingredient.weight,
        foodCategory: ingredient.foodCategory,
        quantity: ingredient.quantity,
        text: ingredient.text,
      })),
      userid: userid,
    }]);

    return res.status(200).json({
      label: label,
      ingredients: ingredients,
      message: "Recipe create successful",
      statusCode: 200,
    });
  } catch (error) {
    console.error("Error in generateNewRecipeData:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message, 
      statusCode: 500,
    });
  }
}


// To Get All The Recipe Data
async function getAllRecipeData(req, res) {
  try {
    var recipeData = await getAllRecipeDatas(req);
    if (recipeData.length <= 0) {
      res.status(400).json({ data: "Recipe Data Not Found" });
      return;
    }
    // Remove the second filename in the image object for each recipe
    recipeData = recipeData.map(recipe => {
      if (recipe.image && recipe.image.filename) {
        const { filename, ...restOfImage } = recipe.image;
        return { ...recipe, image: { ...restOfImage } };
      }
      return recipe;
    });
    console.log(recipeData);
    res.status(200).json({ recipeData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal Server Error" });
  }
}

// To get recipe Data For Specific User
async function getSpecificUserRecipeData(req, res) {
  var allRecipeDatas = await getAllRecipeDatas(req);
  try {
    if (allRecipeDatas > 0) {
      res.status(400).json({ data: "No Data found" });
    } else {
      const allRecipeData = allRecipeDatas.filter(
        (item) => item.userid == req.params.id
      );
      console.log(allRecipeData);
      res.json({
        message: "Recipe send successfull",
        statusCode: 200,
        allRecipeData: allRecipeData.reverse(),
        allRecipeDataLength: allRecipeData.length,
      });
    }
  } catch (error) {
    res.json({
      message: "Internal server error ",
      statusCode: 500,
    });
  }
}
// To Edit A Recipe Data
async function updateRecipeDatas(req, res) {
  try {
    const { id } = req.params;
    const updateRecipeDataa=req.body;
    if (!id || !updateRecipeDataa) {
      return res.status(400).json({ data: "Wrong Request" });
    }
    const result = await updateRecipeData(id, updateRecipeDataa);

    res.status(200).json({
      data: {
        result: result,
        message: "Updated Successfully",
        statusCode: 200,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal Server Error" });
  }
}
// To Delete A Specific Recipe Data
async function deleteRecipeDatas(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ data: "Wrong Request" });
    } else {
      const result = await deleteRecipeData(id);
      console.log(result);
      res.status(200).json({
        data: {
          result: result,
          statusCode: 200,
          message: "Recipe Deleted Successfully",
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: "Internal Server Error",
      message: "Internal server error",
      statusCode: 500,
    });
  }
}
export {
  generateNewRecipeData,
  getAllRecipeData,
  getSpecificUserRecipeData,
  updateRecipeDatas,
  deleteRecipeDatas,
};
