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
    { name: "Electronics", slug: "electronics" },
    { name: "Furniture", slug: "furniture" },
    { name: "Clothing & Accessories", slug: "clothing-accessories" },
    { name: "Gaming", slug: "gaming" },
    { name: "Automotive", slug: "automotive" },
    { name: "Outdoors", slug: "outdoors" },
    { name: "Home & Garden", slug: "home-garden" },
    { name: "Kitchen", slug: "kitchen" },
    { name: "Appliances", slug: "appliances" },
    { name: "Tools", slug: "tools" },
    { name: "Jewelry & Watches", slug: "jewelry-watches" },
    { name: "Art & Crafts", slug: "art-crafts" },
    { name: "Real Estate", slug: "real-estate" },
    { name: "Rentals", slug: "rentals" },
    { name: "Education & Classes", slug: "education-classes" },
    { name: "Computers & Tablets", slug: "computers-tablets" },
    { name: "Smartphones & Accessories", slug: "smartphones-accessories" },
    { name: "Cameras & Photography", slug: "cameras-photography" },
    { name: "Office Supplies", slug: "office-supplies" },
    { name: "Events & Experiences", slug: "events-experiences" },
    { name: "Sports Memorabilia", slug: "sports-memorabilia" },
    { name: "Vintage & Antiques", slug: "vintage-antiques" },
  ];

  const tags = [
    { name: "Electronics" },
    { name: "Furniture" },
    { name: "Clothing" },
    { name: "Gaming" },
    { name: "Automotive" },
    { name: "Outdoors" },
    { name: "Home" },
    { name: "Kitchen" },
    { name: "Appliances" },
    { name: "Tools" },
    { name: "Jewelry" },
    { name: "Art" },
    { name: "Books" },
    { name: "Movies & TV" },
    { name: "Music" },
    { name: "Sports & Fitness" },
    { name: "Toys & Games" },
    { name: "Collectibles" },
    { name: "Pets & Supplies" },
    { name: "Health & Beauty" },
    { name: "Office Supplies" },
    { name: "Garden & Patio" },
    { name: "Baby & Kids" },
    { name: "Travel & Luggage" },
    { name: "Crafts" },
    { name: "Photography" },
    { name: "Computers & Tablets" },
    { name: "Smartphones & Accessories" },
    { name: "Musical Instruments" },
    { name: "Services" },
    { name: "Real Estate" },
    { name: "Job Offers" },
    { name: "Tickets" },
    { name: "Events & Experiences" },
    { name: "Vintage & Antiques" },
    { name: "Sports Memorabilia" },
  ];

  // Insert the categories into the database
  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
    console.log("Successfully inserted category: " + category.name);
  }

  // Insert the tags into the database
  for (const tag of tags) {
    await prisma.tag.create({
      data: tag,
    });
    console.log("Successfully inserted tag: " + tag.name);
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