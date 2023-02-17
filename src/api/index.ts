import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = Router();

router.get("/", async (req, res) => {
  const programmingLanguages = await prisma.programmingLanguage.findMany({});

  return res.status(200).json(programmingLanguages);
});

router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

export default router;
