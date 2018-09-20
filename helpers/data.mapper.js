const {
  toXML
} = require('jstoxml')

const itemToXML = item => {
  return {
    _name: 'item',
    _attrs: {
      id: item.itemId,
      price: item.price,
      currency: item.currency
    },
    _content: item.itemName
  }
}

const categoryToXML = c => {
  return {
    _name: 'category',
    _attrs: {
      id: c.id
    },
    _content: c.name
  }
}

module.exports = {
  toXML,
  itemToXML,
  categoryToXML
}
