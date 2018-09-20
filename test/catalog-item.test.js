const mongoose = require('mongoose')
const should = require('should')
const uuidv4 = require('uuid/v4')

const config = require('../config/dbsettings')

const CatalogItem = require('../models/item')

mongoose.createConnection(config.db.test)

describe('CatalogItem', () => {
  require('../config/db-prepare')

  describe('#creat()', () => {
    it('Should create a new CatalogItem', function (done) {
      const item = {
        itemId: uuidv4(),
        itemName: 'Sports Watch',
        currency: 'EUR',
        price: 100,
        categories: ['Watches', 'Sports Watches']
      }

      CatalogItem.create(item, (err, createdItem) => {
        should.not.exist(err)
        createdItem.itemName.should.equal('Sports Watch')
        createdItem.price.should.equal(100)
        createdItem.currency.should.equal('EUR')
        createdItem.categories[0].should.equal('Watches')
        createdItem.categories[1].should.equal('Sports Watches')

        done()
      })
    })
  })
})
