const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const categories = [
        { name: 'Electronics', slug: 'electronics' },
        { name: 'Furniture', slug: 'furniture' },
        { name: 'Vehicles', slug: 'vehicles' },
        { name: 'Clothing', slug: 'clothing' },
        // Add more categories as needed
    ];

    // Insert the categories into the database
    for (const category of categories) {
        await prisma.category.create({
            data: category,
        });
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
