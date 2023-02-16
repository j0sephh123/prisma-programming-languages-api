import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/programming_languages", async (req, res) => {
  // const users = await prisma.user.findMany();
  // res.json(users);

  return res.status(200).json({
    data: [1, 2, 3],
  });
});

const server = app.listen(5000, () =>
  console.log(`🚀 Server ready at: http://localhost:5000`)
);
