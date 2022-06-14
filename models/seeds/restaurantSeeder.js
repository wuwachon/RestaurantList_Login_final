const Restaurant = require('../restaurant.js')
const User = require('../user')
const restaurantList = require('../../restaurants.json').results
const userList = require('../../users.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  // assign restaurants to each user
  const resNum = 3
  userList.map((seedUser, userIndex) => {
    User.create(seedUser)
      .then(user => {
        console.log(`${user.name} seed done!`)
        restaurantList.map((seedRest, resIndex) => {
          if (resIndex >= userIndex * resNum && resIndex < (userIndex + 1) * resNum) {
            seedRest.userId = user._id
            Restaurant.create(seedRest)
              .then(res => console.log(`#${res.id} restaurant seed done!`))
          }
        })
      })
      .catch(err => console.log(err))
  })
})

