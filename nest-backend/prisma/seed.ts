import { Dish, PrismaClient, UserInGroupRole } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { group } from 'console';

const prisma = new PrismaClient();
const SALT_OR_ROUNDS = 10;

async function createUserAndAssignToGroup({ email, name }, groupId: number) {
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: await hash('zaq1@WSX', SALT_OR_ROUNDS),
    },
  });
  await prisma.userInGroupRoles.create({
    data: {
      userId: user.id,
      groupId,
      role: UserInGroupRole.CHEF,
    },
  });
  return user;
}

async function createGroupAndUsers() {
  const group1 = await prisma.group.create({
    data: {
      name: 'Wolanowska',
    },
  });
  const user1 = createUserAndAssignToGroup(
    { email: 'yessica@fifciuu.com', name: 'Sylwia' },
    group1.id,
  );
  const user2 = createUserAndAssignToGroup(
    { email: 'me@fifciuu.com', name: 'Filip' },
    group1.id,
  );
  const user3 = createUserAndAssignToGroup(
    { email: 'iga@fifciuu.com', name: 'Iga' },
    group1.id,
  );
  const user4 = createUserAndAssignToGroup(
    { email: 'tomasz@fifciuu.com', name: 'Tomasz' },
    group1.id,
  );

  return {
    group: group1,
    users: [user1, user2, user3, user4],
  };
}

async function createDish(data: Omit<Dish, 'id'>) {
  return await prisma.dish.create({
    data,
  });
}

function dishesFactory(groupId: number): Array<Omit<Dish, 'id'>> {
  return [
    {
      groupId,
      name: 'Makaron ze szpinakiem',
      photoSrc: '',
    },
    {
      groupId,
      name: 'Pomidorowa',
      photoSrc: '',
    },
    {
      groupId,
      name: 'Rosół',
      photoSrc: '',
    },
    {
      groupId,
      name: 'Barszcz Biały',
      photoSrc: '',
    },
    {
      groupId,
      name: 'Gołąbki',
      photoSrc: '',
    },
    {
      groupId,
      name: 'Ryba, Frytki, Surówki',
      photoSrc: '',
    },
  ];
}

async function main() {
  const { group, users } = await createGroupAndUsers();
  const dishes = dishesFactory(group.id);
  for (const dish of dishes) {
    await createDish(dish);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
