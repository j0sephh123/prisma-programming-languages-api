import { dummyProgrammingLanguages } from "../dummyProgrammingLanguages";
import { PrismaType } from "./types";

export function getTypedPrisma(prisma: PrismaType): PrismaType {
  return prisma;
}

export async function deleteAllRecords(prisma: PrismaType) {
  console.log("Deleting old data...");
  const deletedProgrammingLanguages =
    await prisma.programmingLanguage.deleteMany({});
  console.log(
    `Deleted ${deletedProgrammingLanguages.count} programming languages.`
  );

  return deletedProgrammingLanguages.count;
}

export async function seedRecords(prisma: PrismaType) {
  console.log("Start seeding ...");
  for (const item of dummyProgrammingLanguages) {
    const programmingLanguage = await prisma.programmingLanguage.create({
      data: item,
    });
    console.log(
      `Created programming language with name: ${programmingLanguage.name}`
    );
  }
  console.log(
    `Seeding finished. Added ${dummyProgrammingLanguages.length} programming languages.`
  );

  return dummyProgrammingLanguages.length;
}
