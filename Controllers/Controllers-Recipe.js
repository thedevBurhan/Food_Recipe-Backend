import { client } from "../Database/Db.js";
import { ObjectId } from "mongodb";

// Addding Recipe to todoList
export function Recipe(recipe) {
  return client.db("Food_Recipe").collection("Recipe").insertMany(recipe);
}

// Getting all Recipe
export function getAllRecipeDatas(req) {
  return client
    .db("Food_Recipe")
    .collection("Recipe")
    .find(req.query)
    .toArray();
}

// To Edit The Recipe Data
export function updateRecipeData(id, updatedRecipeData) {
  return client
    .db("Food_Recipe")
    .collection("Recipe")
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updatedRecipeData });
}
//  To delete a Specific Recipe Data

export function deleteRecipeData(id) {
  return client
    .db("Food_Recipe")
    .collection("Recipe")
    .deleteOne({ _id: new ObjectId(id) });
}
