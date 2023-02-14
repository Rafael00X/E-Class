import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

// TODO - add prisma to global
/*
let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}
*/
