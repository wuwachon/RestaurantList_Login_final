const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const Restaurant = require('../restaurant.js')
const User = require('../user')
const restaurantList = require('../../restaurants.json').results
const userList = require('../../users.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  // assign restaurants to each user
  const resNum = 3
  return Promise.all(Array.from(
    userList,
    (seedUser, userIndex) => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password.toString(), salt))
        .then(hash => User.create({
          name: seedUser.name,
          email: seedUser.email,
          password: hash
        }))
        .then(user => {
          return Promise.all(Array.from(
            restaurantList,
            (seedRest, resIndex) => {
              if (resIndex >= userIndex * resNum && resIndex < (userIndex + 1) * resNum) {
                seedRest.userId = user._id
                return Restaurant.create(seedRest)
              }
            }
          ))
        })
    }
  ))
  .then(() => {
    console.log('all seed done!')
    process.exit()
  })
})

