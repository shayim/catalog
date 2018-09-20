const mongoose = require('mongoose')
const config = require('./dbsettings')

beforeEach((done) => {
  // function clearDatabase () {
  //   for (let collection in mongoose.connection.collections) {
  //     mongoose.connection.dropCollection(collection)
  //   }
  //   return done()
  // }

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(config.db.test, function (err) {
      if (err) {
        throw err
      }
      done()
      // return clearDatabase()
    })
  } else {
    // return clearDatabase()
  }
})

afterEach(function (done) {
  mongoose.connection.dropDatabase().then(_ =>
    mongoose.disconnect()).catch(err => console.log(err))
  done()
})
