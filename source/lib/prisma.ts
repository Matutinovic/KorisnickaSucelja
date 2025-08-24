import { PrismaClient } from "@prisma/client";

// Tip za globalnu varijablu (da izbjegnemo višestruko kreiranje klijenta u dev modu)
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

// Singleton instanca Prisma klijenta
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "production"
        ? [] // bez logova u produkciji
        : ["query", "info", "warn", "error"], // logovi za razvoj
  });

// Sprema instancu u globalu samo u development okruženju
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
