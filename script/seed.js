'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({name: 'cody', email: 'cody@email.com', password: '123'}),
    User.create({name: 'murphy', email: 'murphy@email.com', password: '123'})
  ])

  const Obama = await User.create({
    name: 'Obama',
    email: 'Mr.ObamaForYourMama@gmail.com',
    password: 'Mishelle2024'
  })

  const products = await Promise.all([
    Product.create({
      name: 'pineapple',
      imageURL: 'pineapple.png',
      quantity: 10,
      description: 'pineapple cap',
      price: 100
    }),
    Product.create({
      name: 'peach',
      imageURL: 'peach.png',
      quantity: 15,
      description: 'peach cap',
      price: 99
    })
  ])

  const Cherry = await Product.create({
    name: 'cherry',
    imageURL: 'cherry.png',
    quantity: 15,
    description: 'cherry cap',
    price: 99
  })

  await Obama.addProduct(Cherry)

  await Obama.addProduct(products[0])

  console.log(`seeded ${users.length} users`)
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
