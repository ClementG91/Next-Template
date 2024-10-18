import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const fakeUsers = 100; // Nombre de faux utilisateurs à créer
  const providers = ['google', 'github', 'credentials', 'discord'];

  for (let i = 0; i < fakeUsers; i++) {
    const provider = providers[Math.floor(Math.random() * providers.length)];
    const createdAt = new Date(
      Date.now() - Math.floor(Math.random() * 31536000000)
    ); // Date aléatoire dans la dernière année

    if (provider === 'credentials') {
      await prisma.user.create({
        data: {
          name: `User ${i + 1}`,
          email: `user${i + 1}@example.com`,
          password: await hash('password123', 12),
          emailVerified: new Date(),
          createdAt: createdAt,
          updatedAt: createdAt,
        },
      });
    } else {
      await prisma.user.create({
        data: {
          name: `User ${i + 1}`,
          email: `user${i + 1}@example.com`,
          emailVerified: new Date(),
          createdAt: createdAt,
          updatedAt: createdAt,
          accounts: {
            create: {
              type: 'oauth',
              provider: provider,
              providerAccountId: `provider${i + 1}`,
            },
          },
        },
      });
    }
  }

  console.log(`${fakeUsers} fake users created`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
