const catalog = require('../data/catalog')

const express = require('express')
const router = express.Router()
const {
  toXML,
  itemToXML,
  categoryToXML
} = require('../helpers/data.mapper')

router.get('/', async function (req, res, next) {
  try {
    const categories = await catalog.getAllCategories()
    res.format({
      'application/json': () => res.json(categories),
      'application/xml': () => {
        const data = []
        categories.forEach(c => {
          data.push(categoryToXML(c))
        })
        res.send(toXML({
          categories: data
        }))
      }
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.get('/:categoryId', async (req, res, next) => {
  catalog.getItemsByCategoryId(req.params.categoryId).then(items => {
    res.format({
      'application/json': () => res.json(items),
      'application/xml': () => {
        const data = []
        items.forEach(item => data.push(itemToXML(item)))
        res.send(toXML({
          items: data
        }))
      }
    })
  }).catch(error => {
    console.error(error)
    throw error
  })
})

router.get('/:categoryId/:itemId', async (req, res, next) => {
  catalog.getItem(req.params.categoryId, req.params.itemId).then(item => {
    res.format({
      'application/json': () => {
        res.json(item)
      },
      'application/xml': () => {
        res.send(toXML(itemToXML(item)))
      }
    })
  }).catch(err => {
    console.error(err)
    next(err)
  })
})

module.exports = router
