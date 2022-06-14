const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  id: {type: Number},
  name: {type: String, required: true},
  name_en: {type: String, default: 'none'},
  category: {type: String, default: 'none'},
  image: {type: String, default: 'none'},
  location: {type: String, required: true},
  phone: {type: String, default: 'none'},
  google_map: {type: String},
  rating: {type: Number, default: 'none'},
  description: {type: String, required: true},
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)