import express from "express";
import api from "./api";

const app = express();

app.use(express.json());

app.use((req, _res, next) => {
  const date = new Date();
  const method = `[${req.method}]`;
  const time = `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;
  const url = ` ${req.url} `;
  const body =
    req.method === "PUT" || req.method === "POST"
      ? JSON.stringify(req.body)
      : "";

  console.log(`${method}${time}${url}${body}`);

  next();
});

app.use("/programming_languages", api);

app.listen(5000, () =>
  console.log(`🚀 Server ready at: http://localhost:5000`)
);
