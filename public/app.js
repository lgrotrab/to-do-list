import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
let tasksPessoal = [
  { task: "Levar o cachorro para passear", checked: false },
  { task: "Comprar ovos", checked: false },
  { task: "Lavar a louça", checked: true },
];

let tasksTrabalho = [
  { task: "Completar estudos", checked: false },
  { task: "Fechar projeto", checked: false },
  { task: "Ligar para o chefe", checked: true },
];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  //envia dados e determina a rota dos formulários de forma dinâmica.
  res.render(__dirname + "../../views/index.ejs", {
    tasks: tasksPessoal,
    route: "/",
  });
});

app.post("/", (req, res) => {
  //checa se os valores estão marcados como finalizados, caso esteja ele marca todos como falso e depois marca como feito o que foi passado já que a pessoa tem opção de desmarcar uma atividade.
  if (req.body.hasOwnProperty("checkbox_position")) {
    for (let i = 0; i < tasksPessoal.length; i++) {
      tasksPessoal[i].checked = false;
    }
    for (let i = 0; i < req.body.checkbox_position.length; i++) {
      tasksPessoal[req.body.checkbox_position[i]].checked = true;
    }
  } else {
    for (let i = 0; i < tasksPessoal.length; i++) {
      tasksPessoal[i].checked = false;
    }
  }
  //Checa se um arquivo está sendo adicionado
  if (req.body.add !== "" && req.body.added) {
    tasksPessoal.unshift({
      task: req.body.add,
      checked: false,
    });
  } //checa se um arquivo está sendo deletado.
  else if (req.body.delete !== undefined) {
    for (let i = 0; i < tasksPessoal.length; i++) {
      if (tasksPessoal[i].task === req.body.delete) {
        tasksPessoal.splice(i, 1);
      }
    }
  }
  //redireciona para não ocorrer requests repetidos.
  if (req.body.route === "trabalho") {
    res.redirect("/trabalho");
  } else {
    res.redirect("/");
  }
});

app.get("/trabalho", (req, res) => {
  //envia dados e determina a rota dos formulários de forma dinâmica.
  res.render(__dirname + "../../views/index.ejs", {
    tasks: tasksTrabalho,
    route: "/trabalho",
  });
});

app.post("/trabalho", (req, res) => {
  //checa se os valores estão marcados como finalizados, caso esteja ele marca todos como falso e depois marca como feito o que foi passado já que a pessoa tem opção de desmarcar uma atividade.
  if (req.body.hasOwnProperty("checkbox_position")) {
    for (let i = 0; i < tasksTrabalho.length; i++) {
      tasksTrabalho[i].checked = false;
    }
    for (let i = 0; i < req.body.checkbox_position.length; i++) {
      tasksTrabalho[req.body.checkbox_position[i]].checked = true;
    }
  } else {
    for (let i = 0; i < tasksTrabalho.length; i++) {
      tasksTrabalho[i].checked = false;
    }
  }
  //Checa se um arquivo está sendo adicionado
  if (req.body.add !== "" && req.body.added) {
    tasksTrabalho.unshift({
      task: req.body.add,
      checked: false,
    });
  } //checa se um arquivo está sendo deletado.
  else if (req.body.delete !== undefined) {
    for (let i = 0; i < tasksTrabalho.length; i++) {
      if (tasksTrabalho[i].task === req.body.delete) {
        tasksTrabalho.splice(i, 1);
      }
    }
  }
  //redireciona para não ocorrer requests repetidos.
  if (req.body.route === "pessoal") {
    res.redirect("/");
  } else {
    res.redirect("/trabalho");
  }
});

export default app;
