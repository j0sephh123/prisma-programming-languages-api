// export class PrismaClass {
//   prisma;

//   constructor(prismaClient: any) {
//     this.prisma = prismaClient;
//   }

//   getClient() {
//     return this.prisma;
//   }
// }

// const prisma =
import { PrismaClient, Prisma } from "@prisma/client";

let prisma: PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>;

export function prismaConnect() {
  prisma = new PrismaClient();
  console.log(prisma);
}
export function prismaGetClient() {
  return prisma;
}
