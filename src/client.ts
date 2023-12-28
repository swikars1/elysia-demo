import { edenTreaty } from "@elysiajs/eden";
import type { App } from "./server";

const client = edenTreaty<App>("http://localhost:3000");

client.grouped.two.get({ $query: { name: "hi" } });

await client["sumbit-form"].post({
  name: "Swikar sharma",
  email: "swikarsharma@gmail.com",
  description: "hi optinal desc",
});

client.idvalidate["213"].get({ $headers: { f: "asd" } }).then(console.log);
