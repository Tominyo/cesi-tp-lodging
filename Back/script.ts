const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function main() {
  let option1 = {
    id: "tv",
    name: "Télévision"
  }

  let option2 = {
    id: "internet",
    name: "Internet"
  }
  
  let color1 = {
    id: "dewey",
    name: "Dewey",
    hex: "#a52a2a"
  }

  let color2 = {
    id: "huey",
    name: "Huey",
    hex: "#006400"
  }

  let color3 = {
    id: "salmon",
    name: "Salmon",
    hex: "#fa8072"
  }



  // Pass 'user' object into query
await prisma.option.create({ data: option1 })
await prisma.option.create({ data: option2 })

await prisma.color.create({ data: color1 })
await prisma.color.create({ data: color2 })
await prisma.color.create({ data: color3 })

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