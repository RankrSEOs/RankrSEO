import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@rankrseo.com';
  const existing = await prisma.user.findUnique({ where: { email } });

  if (!existing) {
    const password = await bcrypt.hash('admin123', 12);
    await prisma.user.create({
      data: {
        name: 'Amit Kumar',
        email,
        password,
        role: 'ADMIN',
      },
    });
    console.log('Admin user created: admin@rankrseo.com / admin123');
  } else {
    console.log('Admin user already exists');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
