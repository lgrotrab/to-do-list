import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
let tasks = ["Levar o cachorro para passear", "Comprar ovos", "Lavar a louça"];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render(__dirname + "../../views/index.ejs", { tasks: tasks });
});

export default app;
