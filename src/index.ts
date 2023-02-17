import { PrismaClient } from "@prisma/client";
import express from "express";
import apiRoutes from "./apiRoutes";
import { deleteAllRecords, getTypedPrisma, seedRecords } from "./utils";

const PORT = 5002;
const prisma = new PrismaClient();
const app = express();

app.set("prisma", prisma);

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

app.get("/seed", async (req, res) => {
  const prisma = getTypedPrisma(req.app.get("prisma"));

  try {
    const numberOfDeletedRecords = await deleteAllRecords(prisma);
    const numberOfRecords = await seedRecords(prisma);

    return res.status(200).json({
      message: `${numberOfDeletedRecords} records deleted from db and ${numberOfRecords} records added to db.`,
    });
  } catch (e) {
    return res.status(404).json({
      message: "Failed to seed database",
    });
  }
});

app.use("/programming_languages", apiRoutes);

app.listen(PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${PORT}`)
);
