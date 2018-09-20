const uuidv4 = require('uuid/v4')

const CatalogItem = require('../models/item')

const saveItem = async function (item) {
  try {
    const newItem = new CatalogItem({
      ...item,
      itemId: uuidv4()
    })

    await newItem.save()
    return newItem
  } catch (err) {
    console.error(err)
    throw err
  }
}

const removeItem = async function (itemId) {
  try {
    const itemRemoved = await CatalogItem.findOneAndRemove({
      itemId: itemId
    })
    return itemRemoved
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = {
  saveItem,
  removeItem
}
