const { PrismaClient } = require('@prisma/client')
const productsData = require('../src/data/products.json')

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding ...')
  
  // Clear existing products
  await prisma.product.deleteMany({})

  for (const p of productsData) {
    const product = await prisma.product.create({
      data: {
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        image: p.image,
        badge: p.badge,
        badgeColor: p.badgeColor,
      }
    })
    console.log(`Created product with id: ${product.id}`)
  }
  
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
