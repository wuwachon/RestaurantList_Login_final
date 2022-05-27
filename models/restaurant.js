const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: {type: String},
  category: {type: String, default: 'none'},
  image: {type: String, default: 'none'},
  location: {type: String},
  phone: {type: String, default: 'none'},
  google_map: {type: String},
  rating: {type: Number, default: 'none'},
  description: {type: String}
})

module.exports = mongoose.model('Restaurant', restaurantSchema)