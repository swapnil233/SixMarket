const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Initiated seeding");

  const categories = [
    {
      name: "Services",
      slug: "services",
      thumbnail:
        "https://images.pexels.com/photos/210881/pexels-photo-210881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Jobs",
      slug: "jobs",
      thumbnail:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Pets",
      slug: "pets",
      thumbnail:
        "https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Sporting Goods",
      slug: "sporting-goods",
      thumbnail:
        "https://images.pexels.com/photos/1462618/pexels-photo-1462618.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Collectibles",
      slug: "collectibles",
      thumbnail:
        "https://images.pexels.com/photos/64824/pexels-photo-64824.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Books & Magazines",
      slug: "books-magazines",
      thumbnail:
        "https://www.pexels.com/photo/person-holding-book-from-shelf-1370298/",
    },
    {
      name: "Toys & Games",
      slug: "toys-games",
      thumbnail:
        "https://images.pexels.com/photos/255514/pexels-photo-255514.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Musical Instruments",
      slug: "musical-instruments",
      thumbnail:
        "https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Farm & Garden",
      slug: "farm-garden",
      thumbnail:
        "https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Health & Beauty",
      slug: "health-beauty",
      thumbnail:
        "https://images.pexels.com/photos/2253835/pexels-photo-2253835.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Baby & Kids",
      slug: "baby-kids",
      thumbnail:
        "https://images.pexels.com/photos/2869318/pexels-photo-2869318.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Free Stuff",
      slug: "free-stuff",
      thumbnail:
        "https://images.pexels.com/photos/842876/pexels-photo-842876.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Tickets",
      slug: "tickets",
      thumbnail:
        "https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Travel & Vacation",
      slug: "travel-vacation",
      thumbnail:
        "https://images.pexels.com/photos/2033343/pexels-photo-2033343.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Community",
      slug: "community",
      thumbnail:
        "https://images.pexels.com/photos/609771/pexels-photo-609771.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Lost & Found",
      slug: "lost-found",
      thumbnail:
        "https://images.pexels.com/photos/262488/pexels-photo-262488.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Electronics",
      slug: "electronics",
      thumbnail:
        "https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Furniture",
      slug: "furniture",
      thumbnail:
        "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Clothing & Accessories",
      slug: "clothing-accessories",
      thumbnail:
        "https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Gaming",
      slug: "gaming",
      thumbnail:
        "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Automotive",
      slug: "automotive",
      thumbnail:
        "https://images.pexels.com/photos/2036544/pexels-photo-2036544.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Outdoors",
      slug: "outdoors",
      thumbnail:
        "https://images.pexels.com/photos/1076081/pexels-photo-1076081.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Home & Garden",
      slug: "home-garden",
      thumbnail:
        "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Kitchen",
      slug: "kitchen",
      thumbnail:
        "https://images.pexels.com/photos/714563/pexels-photo-714563.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Appliances",
      slug: "appliances",
      thumbnail:
        "https://images.pexels.com/photos/1450903/pexels-photo-1450903.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Tools",
      slug: "tools",
      thumbnail:
        "https://images.pexels.com/photos/1409215/pexels-photo-1409215.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Jewelry & Watches",
      slug: "jewelry-watches",
      thumbnail:
        "https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Art & Crafts",
      slug: "art-crafts",
      thumbnail:
        "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Real Estate",
      slug: "real-estate",
      thumbnail:
        "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Rentals",
      slug: "rentals",
      thumbnail:
        "https://images.pexels.com/photos/4246202/pexels-photo-4246202.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Education & Classes",
      slug: "education-classes",
      thumbnail:
        "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Computers & Tablets",
      slug: "computers-tablets",
      thumbnail:
        "https://images.pexels.com/photos/3589903/pexels-photo-3589903.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Smartphones & Accessories",
      slug: "smartphones-accessories",
      thumbnail:
        "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Cameras & Photography",
      slug: "cameras-photography",
      thumbnail:
        "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Office Supplies",
      slug: "office-supplies",
      thumbnail:
        "https://images.pexels.com/photos/227383/pexels-photo-227383.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Events & Experiences",
      slug: "events-experiences",
      thumbnail:
        "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Sports Memorabilia",
      slug: "sports-memorabilia",
      thumbnail:
        "https://images.pexels.com/photos/1308713/pexels-photo-1308713.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Vintage & Antiques",
      slug: "vintage-antiques",
      thumbnail:
        "https://images.pexels.com/photos/3617559/pexels-photo-3617559.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
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
