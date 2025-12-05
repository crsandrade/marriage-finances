import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as transactions from "./transactions.ts";
const app = new Hono();

app.use('*', logger(console.log));

app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

app.get("/make-server-db4095b8/health", (c) => {
  return c.json({ status: "ok" });
});

app.get("/make-server-db4095b8/transactions", async (c) => {
  try {
    const data = await transactions.listTransactions();
    return c.json(data);
  } catch (e) {
    return c.json({ error: (e as Error).message }, 500);
  }
});

app.post("/make-server-db4095b8/transactions", async (c) => {
  try {
    const payload = await c.req.json();
    const created = await transactions.createTransaction(payload);
    return c.json(created, 201);
  } catch (e) {
    return c.json({ error: (e as Error).message }, 500);
  }
});

app.delete("/make-server-db4095b8/transactions/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await transactions.deleteTransaction(id);
    return c.json({ ok: true });
  } catch (e) {
    return c.json({ error: (e as Error).message }, 500);
  }
});

Deno.serve(app.fetch);
