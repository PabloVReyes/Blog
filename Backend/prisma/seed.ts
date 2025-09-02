import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Ejemplo: páginas iniciales del blog
  const settings = [
    { name: "title", value: "Blog" },
    { name: "color", value: "green" },
    { name: "theme", value: "auto" },
  ];

  for (const setting of settings) {
    await prisma.settings.upsert({
      where: { name: setting.name },
      update: {},
      create: {
        name: setting.name,
        value: setting.value
      },
    });
  }

  console.log("Seeding finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });