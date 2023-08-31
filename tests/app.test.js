import app from "../public/app.js";
import request from "supertest";

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });
});

describe("Test the delete action", () => {
  test("It should response with a 200 status code ", async () => {
    const res = await request(app).post("/remove");
    expect(res.statusCode).toBe(200);
  });
});
