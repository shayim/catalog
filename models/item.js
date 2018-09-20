const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
  itemId: {
    type: String,
    unique: true
  },
  itemName: {
    type: String,
    required: true,
    index: true
  },
  price: Number,
  currency: String,
  categories: [String]
})

const CatalogItem = mongoose.model('Item', itemSchema)

module.exports = CatalogItem
