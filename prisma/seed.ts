import { PrismaClient } from "@prisma/client";
import { deleteAllRecords, seedRecords } from "../src/utils";

const prisma = new PrismaClient();

const main = async () => {
  await deleteAllRecords(prisma);
  await seedRecords(prisma);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
