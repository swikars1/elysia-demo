import { describe, expect, it } from "bun:test";
import { Elysia } from "elysia";

describe("Elysia routes", () => {
  it("should return the correct response for the root route", async () => {
    const app = new Elysia().get("/", () => "hi");

    const response = await app
      .handle(new Request("http://localhost:3000/"))
      .then((res) => res.text());

    expect(response).toBe("hi");
  });

  // it("should nullify the token for the /nullifytoken route", async () => {
  //   const app = new Elysia().get("/nullifytoken", ({ store }) => {
  //     store.authUsersToken = "";
  //     return { authUsersToken: store.authUsersToken };
  //   });

  //   const response = await app
  //     .handle(new Request("http://localhost:3000/nullifytoken"))
  //     .then((res) => res.json());

  //   expect(response.uthUsersToken).toEqual("");
  // });
});
