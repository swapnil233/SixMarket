const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Initiated seeding");
  const categories = [
    { name: "Services", slug: "services" },
    { name: "Jobs", slug: "jobs" },
    { name: "Pets", slug: "pets" },
    { name: "Sporting Goods", slug: "sporting-goods" },
    { name: "Collectibles", slug: "collectibles" },
    { name: "Books & Magazines", slug: "books-magazines" },
    { name: "Toys & Games", slug: "toys-games" },
    { name: "Musical Instruments", slug: "musical-instruments" },
    { name: "Farm & Garden", slug: "farm-garden" },
    { name: "Health & Beauty", slug: "health-beauty" },
    { name: "Baby & Kids", slug: "baby-kids" },
    { name: "Free Stuff", slug: "free-stuff" },
    { name: "Tickets", slug: "tickets" },
    { name: "Travel & Vacation", slug: "travel-vacation" },
    { name: "Community", slug: "community" },
    { name: "Lost & Found", slug: "lost-found" },
  ];

  // Insert the categories into the database
  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
    console.log("Successfully inserted " + category.name);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Seed complete. Prisma disconnected.");
  });
