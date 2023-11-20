import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { usersRouter } from "./Routers/Routers-User.js";
import { isAuthenticated } from "./Authentication/Auth.js";
import { RecipedataRouter } from "./Routers/Routers-Recipe.js";
//configure thhe environment
dotenv.config();
const PORT = process.env.PORT;
// initialize express server framework
const app = express();
// MiddleWare
app.use(express.json())
app.use(cors());
// Parse URL-encoded bodies (usually for form data)
app.use(express.urlencoded({ extended: false }));
//UserssRouter
app.use("/users", usersRouter);
// Recipe
app.use("/recipe", isAuthenticated, RecipedataRouter);

// listen to a server
app.listen(PORT, () => console.log(`Server Running in localhost:${PORT}`));
