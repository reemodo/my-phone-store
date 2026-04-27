import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Cleaning existing data...');
  await prisma.product.deleteMany();

  console.log('🌱 Planting new Laqta Shop inventory...');

  const demoProducts = [
    {
      name: 'iPhone 15 Pro Max - 256GB',
      description: 'The ultimate flagship with titanium design and A17 Pro chip.',
      price: 4850.00,
      category: 'Phones',
      condition: 'New',
      stock: 10,
      imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop',
    },
    {
      name: 'iPhone 13 Pro - 128GB',
      description: 'Excellent condition, fully tested with 95% battery health.',
      price: 2400.00,
      category: 'Phones',
      condition: 'Used - Excellent',
      stock: 3,
      imageUrl: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=1000&auto=format&fit=crop',
    },
    {
      name: 'Apple Watch Ultra 2',
      description: 'Rugged, capable, and built to meet the demands of endurance athletes.',
      price: 3199.00,
      category: 'Watches',
      condition: 'New',
      stock: 5,
      imageUrl: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1000&auto=format&fit=crop',
    },
    {
      name: 'Apple Watch Series 8',
      description: 'Used but in great shape. Includes original charger and sports band.',
      price: 1150.00,
      category: 'Watches',
      condition: 'Used - Good',
      stock: 2,
      imageUrl: 'https://images.unsplash.com/photo-1434493789847-2f02b0d2823d?q=80&w=1000&auto=format&fit=crop',
    },
    {
      name: 'AirPods Pro (2nd Gen)',
      description: 'Next-level Active Noise Cancellation and Adaptive Audio.',
      price: 950.00,
      category: 'Audio',
      condition: 'New',
      stock: 15,
      imageUrl: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1000&auto=format&fit=crop',
    },
    {
      name: 'Samsung Galaxy S23 Ultra',
      description: 'Pristine condition. Includes S-Pen and clear case.',
      price: 3800.00,
      category: 'Phones',
      condition: 'Used - Like New',
      stock: 1,
      imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1000&auto=format&fit=crop',
    }
  ];

  for (const product of demoProducts) {
    const created = await prisma.product.create({
      data: product,
    });
    console.log(`✅ Added: ${created.name}`);
  }

  console.log('🎉 Database seeding complete! Your store is now stocked.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });