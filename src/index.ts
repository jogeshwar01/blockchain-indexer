import { Hono } from "hono";

const app = new Hono();

app.post("/", async (c: any) => {
  if (
    !c.req.header("Authorization") ||
    c.req.header("Authorization") !== c.env.AUTH_TOKEN
  ) {
    return c.json(
      {
        message: "Unauthorized",
      },
      401
    );
  }

  const body = await c.req.json();
  console.log("Data received by webhook", JSON.stringify(body, null, 2));
  console.log("Headers -", c.req.header());
  console.log("Query Params -", c.req.query("param"));

  return c.json({
    message: "Hello Hono!",
  });
});

export default app;
