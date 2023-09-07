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
  tasksPessoal = checkCheckboxes(req.body, tasksPessoal);
  tasksPessoal = filterAction(req.body, tasksPessoal);
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
  tasksTrabalho = checkCheckboxes(req.body, tasksTrabalho);
  tasksTrabalho = filterAction(req.body, tasksTrabalho);
  if (req.body.route === "pessoal") {
    res.redirect("/");
  } else {
    res.redirect("/trabalho");
  }
});

/*checa se os valores estão marcados como finalizados, 
caso esteja ele marca todos como falso e depois marca como feito 
o que foi passado já que a pessoa tem opção de desmarcar uma atividade.*/
function checkCheckboxes(body, array) {
  if (array.length === 0) {
    return "Array vazio";
  }
  if (!Array.isArray(array)) {
    return "Array inválido";
  }
  for (let i = 0; i < array.length; i++) {
    if (!array[i].hasOwnProperty("task")) {
      return "Objeto do array não apresenta chave task";
    }
    if (!array[i].hasOwnProperty("checked")) {
      return "Objeto do array não apresenta chave checked";
    }
  }
  if (body.hasOwnProperty("checkbox_position")) {
    for (let i = 0; i < array.length; i++) {
      array[i].checked = false;
    }
    for (let i = 0; i < body.checkbox_position.length; i++) {
      array[body.checkbox_position[i]].checked = true;
    }
    return array;
  } else {
    for (let i = 0; i < array.length; i++) {
      array[i].checked = false;
    }
    return array;
  }
}

function filterAction(body, array) {
  if (!Array.isArray(array)) {
    return "Array inválido";
  }
  //Checa se um arquivo está sendo adicionado
  if (body.hasOwnProperty("add") && body.hasOwnProperty("added")) {
    if (body.add !== "" && body.added) {
      array.unshift({
        task: body.add,
        checked: false,
      });
      return array;
    }
  }
  //checa se um arquivo está sendo deletado.
  else if (body.delete !== undefined) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].task === body.delete) {
        array.splice(i, 1);
      }
    }
    return array;
  }
  return array;
}

export { app as default, filterAction, checkCheckboxes };
