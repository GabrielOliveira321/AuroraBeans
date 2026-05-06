const { PrismaClient } = require('@prisma/client');
try {
  const client = new PrismaClient();
  console.log("Success with no args!");
} catch (e) {
  console.error(e.message);
}
