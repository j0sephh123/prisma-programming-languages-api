import { Prisma } from "@prisma/client";

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
