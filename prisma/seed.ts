import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany({
        where: { email: 'dev.user@example.com' },
    });

    const user = await prisma.user.create({
        data: {
            email: 'dev.user@example.com',
            name: 'Dev User',
        },
    });

    console.log({ user });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
