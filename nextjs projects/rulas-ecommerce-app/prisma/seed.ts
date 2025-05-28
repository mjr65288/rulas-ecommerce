import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany(); // Clear existing data

  await prisma.product.createMany({
    data: [
      {
        title: 'Wireless Headphones',
        description: 'Noise-cancelling over-ear headphones with Bluetooth connectivity.',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
        category: 'Electronics',
      },
      {
        title: 'Running Shoes',
        description: 'Lightweight and comfortable shoes for everyday running.',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
        category: 'Footwear',
      },
      {
        title: 'Smart Watch',
        description: 'Track your health and notifications with this stylish smart watch.',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
        category: 'Accessories',
      },
    ],
  });

  console.log('✅ Sample products seeded');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
