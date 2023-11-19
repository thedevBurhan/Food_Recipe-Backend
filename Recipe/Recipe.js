import {
  Recipe,
  getAllRecipeDatas,
  updateRecipeData,
  deleteRecipeData,
} from "../Controllers/Controllers-Recipe.js";

// To Generate Recipe Data
async function generateNewRecipeData(req, res) {
  const { calories, label, totalTime, url,text, userid, ingredients } = req.body;

  try {
    await Recipe([
      {
        text:text,
        calories: calories,
        label: label,
        totalTime: totalTime,
        url: url,
        ingredients: ingredients.map((ingredient) => ({
          food: ingredient.food,
          foodCategory: ingredient.foodCategory,
          quantity: ingredient.quantity,
        })),
        userid: userid,
      },
    ]);

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
    const recipeData = await getAllRecipeDatas(req);
    if (recipeData.length <= 0) {
      res.status(400).json({ data: "Recipe Data Not Found" });
      return;
    }
    res.status(200).json({ recipeData });
  } catch (error) {
    console.log(error);
    res.send(500).json({ data: "Internal Server Error" });
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
    let images = [];

    if (req.file) {
      let BASE_URL = `${req.protocol}://${req.get("host")}`;
      let imageUrl = `${BASE_URL}/img/${req.file.filename}`;
      images.push({ image: imageUrl });
    }

    const updateRecipeDataa = {
      ...req.body,
      images: images,
    };

    if (!id || !updateRecipeDataa) {
      return res.status(400).json({ data: "Wrong Request" });
    }

    // Assuming updateRecipeData is a function that updates the recipe in your database
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
