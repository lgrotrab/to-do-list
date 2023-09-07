import app, { filterAction, checkCheckboxes } from "../public/app.js";
import request from "supertest";

describe("Testa as portas da api", () => {
  test("It should response the GET method", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });

  test("It should response with a 200 status code ", async () => {
    const res = await request(app).get("/trabalho");
    expect(res.statusCode).toBe(200);
  });

  test("Envia dados para a página inicial", async () => {
    const tasks = [{ task: "cozinhar batata", checked: false }];
    const res = await request(app).post("/").send(tasks);
    expect(res.statusCode).toBe(302);
  });

  test("Envia dados para a página de trabalho", async () => {
    const tasks = [{ task: "cozinhar batata", checked: false }];
    const res = await request(app).post("/trabalho").send(tasks);
    expect(res.statusCode).toBe(302);
  });
});

describe("Testa a função de checkCheckbox", () => {
  test("Retorna o array com os valores alterados dependendo do valor do checkbox", () => {
    const testArray = [
      { task: "lavar a louça", checked: "false" },
      { task: "passar o pano no chão", checked: "true" },
    ];
    const body = { checkbox_position: [0] };
    expect(checkCheckboxes(body, testArray)).toStrictEqual([
      { task: "lavar a louça", checked: true },
      { task: "passar o pano no chão", checked: false },
    ]);
  });

  test("Envia um objeto vazio como body", () => {
    const testArray = [
      { task: "lavar a louça", checked: "true" },
      { task: "passar o pano no chão", checked: "true" },
    ];
    const body = {};
    expect(checkCheckboxes(body, testArray)).toStrictEqual([
      { task: "lavar a louça", checked: false },
      { task: "passar o pano no chão", checked: false },
    ]);
  });

  test("Envia valores aleatórios como parte do body", () => {
    const testArray = [
      { task: "lavar a louça", checked: "true" },
      { task: "passar o pano no chão", checked: "true" },
    ];
    const body = {
      batatas: true,
      Trivago: "sim",
    };
    expect(checkCheckboxes(body, testArray)).toStrictEqual([
      { task: "lavar a louça", checked: false },
      { task: "passar o pano no chão", checked: false },
    ]);
  });

  test("Envia o array de teste com chave task errada", () => {
    const testArray = [
      { afazer: "lavar a louça", checked: "true" },
      { afazer: "passar o pano no chão", checked: "true" },
    ];
    const body = { checkbox_position: [0] };
    expect(checkCheckboxes(body, testArray)).toBe(
      "Objeto do array não apresenta chave task",
    );
  });

  test("Envia o array de teste com chave checked errada", () => {
    const testArray = [
      { task: "lavar a louça", check: "true" },
      { task: "passar o pano no chão", check: "true" },
    ];
    const body = { checkbox_position: [0] };
    expect(checkCheckboxes(body, testArray)).toBe(
      "Objeto do array não apresenta chave checked",
    );
  });

  test("Envia o array de teste vazio", () => {
    const testArray = [];
    const body = { checkbox_position: [0] };
    expect(checkCheckboxes(body, testArray)).toBe("Array vazio");
  });

  test("Não envia um array", () => {
    const testArray = "Teste";
    const body = { checkbox_position: [0] };
    expect(checkCheckboxes(body, testArray)).toBe("Array inválido");
  });
});

describe("Testa a função de filtrar ação de deletar e adicionar items", () => {
  test("Envia comando para adicionar novo item no array", () => {
    const body = { add: "Viajar para Londres", added: true };
    const array = [
      { task: "Comprar arroz", checked: true },
      { task: "Limpar a casa", checked: false },
    ];
    expect(filterAction(body, array)).toStrictEqual([
      { task: "Viajar para Londres", checked: false },
      { task: "Comprar arroz", checked: true },
      { task: "Limpar a casa", checked: false },
    ]);
  });
  test("Envia body vazio", () => {
    const body = {};
    const array = [
      { task: "Comprar arroz", checked: true },
      { task: "Limpar a casa", checked: false },
    ];
    expect(filterAction(body, array)).toStrictEqual(array);
  });
  test("Envia array existente vazio", () => {
    const body = { add: "Viajar para Londres", added: true };
    const array = [];
    expect(filterAction(body, array)).toStrictEqual([
      { task: "Viajar para Londres", checked: false },
    ]);
  });
  test("Envia body com chaves erradas", () => {
    const body = { addition: "Viajar para Londres", isAdded: true };
    const array = [
      { task: "Comprar arroz", checked: true },
      { task: "Limpar a casa", checked: false },
    ];
    expect(filterAction(body, array)).toStrictEqual(array);
  });
  test("Envia comando de deleção do array", () => {
    const body = { delete: "Comprar arroz" };
    const array = [
      { task: "Comprar arroz", checked: true },
      { task: "Limpar a casa", checked: false },
    ];
    expect(filterAction(body, array)).toStrictEqual([
      { task: "Limpar a casa", checked: false },
    ]);
  });
  test("Envia comando para deletar item não existente no array", () => {
    const body = { delete: "Comer cuscuz" };
    const array = [
      { task: "Comprar arroz", checked: true },
      { task: "Limpar a casa", checked: false },
    ];
    expect(filterAction(body, array)).toStrictEqual(array);
  });
});
