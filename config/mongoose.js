const mongoose = require('mongoose')
mongoose.Promise = Promise

const env = require('./set-env').env
const dbseeder = require('./dbseeder')
const url = 'mongodb://localhost:27017/catalog'

if (env === 'development') {
  dbseeder.seed(mongoose)
}

mongoose.connect(url).then(m => {
  console.log('mongodb connected')
})
  .catch(err => console.error('ERROR:', err))
