import { PrismaClient } from "@prisma/client";

declare global {
  var PRISMA: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.PRISMA) {
    global.PRISMA = new PrismaClient();
  }
  prisma = global.PRISMA;
}

export default prisma;
