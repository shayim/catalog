const express = require('express')
const router = express.Router()

const item = require('../data/item')

router.post('/', async (req, res, next) => {
  try {
    const newItem = await item.saveItem(req.body)
    res.json(newItem)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.delete('/:itemId', async (req, res, next) => {
  try {
    const itemRemoved = await item.removeItem(req.params.itemId)
    if (itemRemoved) {
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
