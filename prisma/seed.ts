import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const dummyProgrammingLanguages: Prisma.ProgrammingLanguageCreateInput[] =
  [
    { type: "Procedural", name: "C" },
    { type: "Procedural", name: "Pascal" },
    { type: "Procedural", name: "BASIC" },
    { type: "Functional", name: "Scala" },
    { type: "Functional", name: "Erlang" },
    { type: "Functional", name: "Haskell" },
    { type: "Functional", name: "Elixir" },
    { type: "Functional", name: "F#" },
    { type: "Object-oriented", name: "Java" },
    { type: "Object-oriented", name: "PHP" },
    { type: "Object-oriented", name: "C++" },
    { type: "Object-oriented", name: "Ruby" },
    { type: "Scripting", name: "Node" },
    { type: "Scripting", name: "Bash" },
    { type: "Scripting", name: "Python" },
    { type: "Scripting", name: "Perl" },
    { type: "Logic", name: "Prolog" },
    { type: "Logic", name: "Absys" },
    { type: "Logic", name: "Datalog" },
    { type: "Logic", name: "Alma-0" },
  ];

async function main() {
  console.log("Deleting old data...");
  const deletedProgrammingLanguages = await prisma.programmingLanguage.deleteMany({});
  console.log(`Deleted ${deletedProgrammingLanguages.count} programming languages.`)

  console.log("Start seeding ...");
  for (const item of dummyProgrammingLanguages) {
    const programmingLanguage = await prisma.programmingLanguage.create({
      data: item,
    });
    console.log(
      `Created programming language with name: ${programmingLanguage.name}`
    );
  }
  console.log(`Seeding finished. Added ${dummyProgrammingLanguages.length} programming languages.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
