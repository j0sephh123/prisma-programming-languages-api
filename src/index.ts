import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use((req, res, next) => {
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

app.get("/programming_languages", async (req, res) => {
  const programmingLanguages = await prisma.programmingLanguage.findMany({});

  return res.status(200).json(programmingLanguages);
});

app.get("/programming_languages/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const foundProgrammingLanguage =
      await prisma.programmingLanguage.findFirstOrThrow({ where: { id } });

    return res.status(200).json({
      ...foundProgrammingLanguage,
    });
  } catch (e) {
    return res.status(404).json({
      message:
        "Failed to find programming language. Probably it doesn't exist.",
    });
  }
});

app.post("/programming_languages", async (req, res) => {
  const { name, type } = req.body;

  if (!name) {
    return res.status(404).json({
      message: "`name` body of type `String` not provided.",
    });
  }

  if (!type) {
    return res.status(404).json({
      message: "`type` body of type `String` not provided.",
    });
  }

  try {
    const createdProgrammingLanguage = await prisma.programmingLanguage.create({
      data: {
        name,
        type,
      },
    });

    return res.status(200).json({
      ...createdProgrammingLanguage,
    });
  } catch (e) {
    // https://www.prisma.io/docs/concepts/components/prisma-client/handling-exceptions-and-errors
    return res.status(404).json({
      message:
        "Failed to create programming language. Ensure that the provided data doesn't already exist.",
    });
  }
});

app.delete("/programming_languages/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProgrammingLanguage = await prisma.programmingLanguage.delete({
      where: { id },
    });

    return res.status(200).json({
      ...deletedProgrammingLanguage,
    });
  } catch (e) {
    return res.status(404).json({
      message:
        "Failed to delete programming language. Probably it doesn't exist.",
    });
  }
});

app.put("/programming_languages/:id", async (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;

  if (!name && !type) {
    return res.status(404).json({
      message: "`type` and `name` not provided.",
    });
  }

  try {
    console.log({ name, type, id });
    const updatedProgrammingLanguage = await prisma.programmingLanguage.update({
      where: { id },
      data: {
        name: name,
        type: type,
      },
    });

    return res.status(200).json({
      ...updatedProgrammingLanguage,
    });
  } catch (e) {
    return res.status(404).json({
      message:
        "Failed to update programming language. Maybe the updated name already exists?",
    });
  }
});

app.listen(5000, () =>
  console.log(`🚀 Server ready at: http://localhost:5000`)
);
