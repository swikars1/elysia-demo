import { Elysia } from "elysia";
const setup = new Elysia({ name: "setup" })
  .decorate({
    argon: "a",
    boron: "b",
    carbon: "c",
  })
  .state({
    token: "87asdbj",
    id: "1",
    email: "asd@sd.d",
  });

const app1 = new Elysia()
  .use(setup.suffix("decorator", "setup").prefix("state", "authUser"))
  .derive(({ store }) => {
    return {
      bearerToken: "Bearer " + store.authUserToken,
    };
  })

  .get("/", ({ carbonSetup, store, bearerToken }) => ({
    carbonSetup,
    authUserId: store.authUserId,
    bearerToken,
  }));

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/swikar", () => ({ swikar: "done" }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
