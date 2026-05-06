const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Fixing Product sequence...');
  await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"Product"', 'id'), coalesce(max(id)+1, 1), false) FROM "Product"`);
  console.log('Sequence fixed!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
