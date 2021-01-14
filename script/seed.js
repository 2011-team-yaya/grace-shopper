'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({name: 'cody', email: 'cody@email.com', password: '123'}),
    User.create({name: 'murphy', email: 'murphy@email.com', password: '123'}),
    User.create({
      name: 'Obama',
      email: 'Mr.ObamaForYourMama@gmail.com',
      password: 'Michelle2024'
    })
  ])

  const TestOrder = await Order.create({
    id: 101,
    userId: 3
  })

  const products = await Promise.all([
    Product.create({
      name: 'pineapple',
      imageURL: 'pineapple.png',
      quantity: 10,
      description: `Create the perfect accessory by adding your embroidered designs to this classic trucker cap. It has a structured fit with a mesh back, and it's bound to become a favorite for all occasions.
      60% cotton, 40% polyester*
      Mid-profile cap with a low-profile embroidery area
      Structured, six-panel cap
      Hard buckram front panels
      Mesh back
      Permacurv visor, matching under-visor
      Plastic adjustable closure
      3.5″ crown (8.9 cm)
      Head circumference: 21⅝″–23⅝″ (54.9 cm–60 cm)`,
      price: 100
    }),
    Product.create({
      name: 'peach',
      imageURL: 'peach.png',
      quantity: 15,
      description: `Create the perfect accessory by adding your embroidered designs to this classic trucker cap. It has a structured fit with a mesh back, and it's bound to become a favorite for all occasions.
      60% cotton, 40% polyester*
      Mid-profile cap with a low-profile embroidery area
      Structured, six-panel cap
      Hard buckram front panels
      Mesh back
      Permacurv visor, matching under-visor
      Plastic adjustable closure
      3.5″ crown (8.9 cm)
      Head circumference: 21⅝″–23⅝″ (54.9 cm–60 cm)`,
      price: 99
    }),
    Product.create({
      name: 'banana',
      imageURL: 'banana.png',
      quantity: 12,
      description: `Create the perfect accessory by adding your embroidered designs to this classic trucker cap. It has a structured fit with a mesh back, and it's bound to become a favorite for all occasions.
      60% cotton, 40% polyester*
      Mid-profile cap with a low-profile embroidery area
      Structured, six-panel cap
      Hard buckram front panels
      Mesh back
      Permacurv visor, matching under-visor
      Plastic adjustable closure
      3.5″ crown (8.9 cm)
      Head circumference: 21⅝″–23⅝″ (54.9 cm–60 cm)`,
      price: 80
    }),
    Product.create({
      name: 'watermelon',
      imageURL: 'watermelon.png',
      quantity: 18,
      description: `Create the perfect accessory by adding your embroidered designs to this classic trucker cap. It has a structured fit with a mesh back, and it's bound to become a favorite for all occasions.
      60% cotton, 40% polyester*
      Mid-profile cap with a low-profile embroidery area
      Structured, six-panel cap
      Hard buckram front panels
      Mesh back
      Permacurv visor, matching under-visor
      Plastic adjustable closure
      3.5″ crown (8.9 cm)
      Head circumference: 21⅝″–23⅝″ (54.9 cm–60 cm)`,
      price: 90
    }),
    Product.create({
      name: 'grape',
      imageURL: 'grape.png',
      quantity: 8,
      description: `Create the perfect accessory by adding your embroidered designs to this classic trucker cap. It has a structured fit with a mesh back, and it's bound to become a favorite for all occasions.
      60% cotton, 40% polyester*
      Mid-profile cap with a low-profile embroidery area
      Structured, six-panel cap
      Hard buckram front panels
      Mesh back
      Permacurv visor, matching under-visor
      Plastic adjustable closure
      3.5″ crown (8.9 cm)
      Head circumference: 21⅝″–23⅝″ (54.9 cm–60 cm)`,
      price: 100
    }),
    Product.create({
      name: 'orange',
      imageURL: 'orange.png',
      quantity: 14,
      description: `Create the perfect accessory by adding your embroidered designs to this classic trucker cap. It has a structured fit with a mesh back, and it's bound to become a favorite for all occasions.
      60% cotton, 40% polyester*
      Mid-profile cap with a low-profile embroidery area
      Structured, six-panel cap
      Hard buckram front panels
      Mesh back
      Permacurv visor, matching under-visor
      Plastic adjustable closure
      3.5″ crown (8.9 cm)
      Head circumference: 21⅝″–23⅝″ (54.9 cm–60 cm)`,
      price: 75
    }),
    Product.create({
      name: 'lemon',
      imageURL: 'lemon.png',
      quantity: 16,
      description: `Create the perfect accessory by adding your embroidered designs to this classic trucker cap. It has a structured fit with a mesh back, and it's bound to become a favorite for all occasions.
      60% cotton, 40% polyester*
      Mid-profile cap with a low-profile embroidery area
      Structured, six-panel cap
      Hard buckram front panels
      Mesh back
      Permacurv visor, matching under-visor
      Plastic adjustable closure
      3.5″ crown (8.9 cm)
      Head circumference: 21⅝″–23⅝″ (54.9 cm–60 cm)`,
      price: 70
    }),
    Product.create({
      name: 'kiwi',
      imageURL: 'kiwi.png',
      quantity: 20,
      description: `Create the perfect accessory by adding your embroidered designs to this classic trucker cap. It has a structured fit with a mesh back, and it's bound to become a favorite for all occasions.
      60% cotton, 40% polyester*
      Mid-profile cap with a low-profile embroidery area
      Structured, six-panel cap
      Hard buckram front panels
      Mesh back
      Permacurv visor, matching under-visor
      Plastic adjustable closure
      3.5″ crown (8.9 cm)
      Head circumference: 21⅝″–23⅝″ (54.9 cm–60 cm)`,
      price: 65
    })
  ])

  const Cherry = await Product.create({
    name: 'cherry',
    imageURL: 'cherry.png',
    quantity: 15,
    description: `Create the perfect accessory by adding your embroidered designs to this classic trucker cap. It has a structured fit with a mesh back, and it's bound to become a favorite for all occasions.
    60% cotton, 40% polyester*
    Mid-profile cap with a low-profile embroidery area
    Structured, six-panel cap
    Hard buckram front panels
    Mesh back
    Permacurv visor, matching under-visor
    Plastic adjustable closure
    3.5″ crown (8.9 cm)
    Head circumference: 21⅝″–23⅝″ (54.9 cm–60 cm)`,
    price: 99
  })

  await TestOrder.addProduct(Cherry)

  console.log(
    `seeded ${users.length} users and ${products.length + 1} products`
  )
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
