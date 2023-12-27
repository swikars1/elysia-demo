import { Elysia } from "elysia";
const setup = new Elysia({ name: "setup" })
  .decorate({
    argon: "a",
    boron: "b",
    carbon: "c",
  })
  .state({
    token: "initial-token",
    id: "1",
    email: "asd@sd.d",
  });

const app = new Elysia()
  .use(setup.suffix("decorator", "setup").prefix("state", "authUsers"))
  .derive(({ store }) => {
    return {
      bearerToken: "Bearer " + store.authUsersToken,
    };
  })

  .get("/", ({ carbonSetup, store, bearerToken }) => ({
    carbonSetup,
    authUserId: store.authUsersId,
    bearerToken,
  }))
  .get("/nullifytoken", ({ store }) => {
    store.authUsersToken = "";
    return {
      a: store.authUsersToken,
    };
  })

  .get("/token", ({ store, bearerToken }) => ({
    again: store.authUsersToken,
    bearerToken,
  }))
  .listen(3001);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
