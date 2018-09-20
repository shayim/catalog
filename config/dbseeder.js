const uuidv4 = require('uuid/v4')
const CatalogItem = require('../models/item')

const saveCallback = (err, doc) => {
  if (err) {
    console.log(err)
    throw err
  }
  console.log(doc)
}

const seed = (mongoose) => {
  const db = mongoose.connection
  db.once('open', function () {
    CatalogItem.count({}).then(count => {
      if (count === 0) {
        const watch = new CatalogItem({
          'categories': ['Watches', 'Sports Watches'],
          'itemId': uuidv4(),
          'itemName': 'Fitbit Versa Smart Watch',
          'price': 199.95,
          'currency': 'USD'
        })

        const book = new CatalogItem({
          itemId: uuidv4(),
          itemName: 'The Girl on the Train',
          price: 10.40,
          currency: 'USD',
          categories: ['Books', 'Thrillers & Suspense']
        })

        watch.save(saveCallback)
        book.save(saveCallback)
      }
    }).catch(err => {
      console.log(err)
    })
  })
}

module.exports = {
  seed
}
