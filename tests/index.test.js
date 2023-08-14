import app from "../public/index.js";
import request from "supertest";

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });
});
