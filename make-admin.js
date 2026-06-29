const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'vinitpathak16@gmail.com';
  
  const user = await prisma.user.update({
    where: { email: adminEmail },
    data: { role: 'ADMIN' }
  });
  
  console.log('Made user ADMIN:', user.email);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
