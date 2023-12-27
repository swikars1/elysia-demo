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

const setup2 = new Elysia().decorate("a12", "a");

const child2 = new Elysia().use(setup2).get("/", ({ a12 }) => a12);

// index.ts

// child.ts

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

  .get(
    "/hello",
    () => `<div>Hello Worldsss<a href="https://youtube.com">asd</a></div>`,
    {
      afterHandle({ response, set }) {
        set.headers["Content-Type"] = "text/html; charset=utf8";
      },
    }
  )
  .get(
    "/nohtml",
    () => `<div>Hi World<a href="https://youtube.com">asd</a></div>`
  )

  .onAfterHandle(({ response, set }) => {
    if (response) {
      set.headers["Content-Type"] = "text/html; charset=utf8";
    }
  })
  .get(
    "/hihtml",
    () => `<div>Hi World<a href="https://youtube.com">asd</a></div>`
  )
  .onAfterHandle(() => {
    console.log("after handle");
  })
  .onBeforeHandle(() => {
    console.log("before handle");
  })
  .get("/order", () => "hi order", {
    beforeHandle() {
      console.log("local before");
    },
  })

  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
