import { PrismaClient, UserInGroupRole } from '@prisma/client';
import { compare, hash } from 'bcrypt';

const prisma = new PrismaClient();
const SALT_OR_ROUNDS = 10;

async function main() {
  const group1 = await prisma.group.create({
    data: {
      name: 'Wolanowska',
    },
  });
  const user1 = await prisma.user.create({
    data: {
      email: 'yessica@fifciuu.com',
      name: 'Sylwia',
      password: await hash('zaq1@WSX', SALT_OR_ROUNDS),
    },
  });
  const ur1 = await prisma.userInGroupRoles.create({
    data: {
      userId: user1.id,
      groupId: group1.id,
      role: UserInGroupRole.CHEF,
    },
  });
  const user2 = await prisma.user.create({
    data: {
      email: 'me@fifciuu.com',
      name: 'Filip',
      password: await hash('zaq1@WSX', SALT_OR_ROUNDS),
    },
  });
  const ur2 = await prisma.userInGroupRoles.create({
    data: {
      userId: user2.id,
      groupId: group1.id,
      role: UserInGroupRole.USER,
    },
  });
  const user3 = await prisma.user.create({
    data: {
      email: 'iga@fifciuu.com',
      name: 'Iga',
      password: await hash('zaq1@WSX', SALT_OR_ROUNDS),
    },
  });
  const ur3 = await prisma.userInGroupRoles.create({
    data: {
      userId: user3.id,
      groupId: group1.id,
      role: UserInGroupRole.USER,
    },
  });
  const user4 = await prisma.user.create({
    data: {
      email: 'tomasz@fifciuu.com',
      name: 'Tomasz',
      password: await hash('zaq1@WSX', SALT_OR_ROUNDS),
    },
  });
  const ur4 = await prisma.userInGroupRoles.create({
    data: {
      userId: user4.id,
      groupId: group1.id,
      role: UserInGroupRole.USER,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
