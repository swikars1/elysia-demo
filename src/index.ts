import { Elysia, t } from "elysia";
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

// this doesnt work as stated in docs

// const globalVali = new Elysia({ name: "globalvali" }).schema({
//   query: t.Object({
//     name: t.String(),
//   }),
// });

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

  //global validation
  .onBeforeHandle(() => ({
    query: t.Object({
      age: t.Numeric(),
    }),
  }))

  .get(
    "/hello",
    () => `<div>Hello Worldsss<a href="https://youtube.com">asd</a></div>`,
    {
      // query: t.Object({
      //   name: t.String(),
      // }),
      afterHandle({ response, set }) {
        set.headers["Content-Type"] = "text/html; charset=utf8";
      },
      beforeHandle({ query, set }) {
        if (query.name !== "swikar") {
          set.status = 400;
          set.redirect = "nohtml";
          return;
        }
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
  //local validation
  .get("/idvalidate/:id", ({ params: { id }, headers: { f } }) => id, {
    params: t.Object({
      id: t.Numeric(),
    }),
    headers: t.Object({
      f: t.String(),
    }),
  })

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
