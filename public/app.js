import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
let tasks = [
  { task: "Levar o cachorro para passear", checked: false },
  { task: "Comprar ovos", checked: false },
  { task: "Lavar a louça", checked: true },
];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render(__dirname + "../../views/index.ejs", { tasks: tasks });
});

app.post("/", (req, res) => {
  //checa se os valores estão marcados como finalizados, caso esteja ele marca todos como falso e depois marca como feito o que foi passado já que a pessoa tem opção de desmarcar uma atividade.
  if (req.body.hasOwnProperty("checkbox_position")) {
    for (let i = 0; i < tasks.length; i++) {
      tasks[i].checked = false;
    }
    for (let i = 0; i < req.body.checkbox_position.length; i++) {
      tasks[req.body.checkbox_position[i]].checked = true;
    }
  } else {
    for (let i = 0; i < tasks.length; i++) {
      tasks[i].checked = false;
    }
  }
  //Checa se um arquivo está sendo adicionado
  if (req.body.add !== "" && req.body.added) {
    tasks.unshift({
      task: req.body.add,
      checked: false,
    });
  } //checa se um arquivo está sendo deletado.
  else if (req.body.delete !== undefined) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].task === req.body.delete) {
        tasks.splice(i, 1);
      }
    }
  }
  //redireciona para página principal para não ocorrer requests repetidos.
  res.redirect("/");
});

export default app;
