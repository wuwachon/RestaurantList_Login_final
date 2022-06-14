const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

// mondoDB connect
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error', () => console.log('MongoDB connect error!'))
db.once('open', () => {
  console.log('MongoDB connected!')
})

module.exports = db