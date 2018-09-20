const fs = require('fs-extra')
const path = require('path')
const catalogFile = path.join(__dirname, 'dev/catalog.json')
let cache = null

const initCatalog = async function () {
  if (cache) return cache

  try {
    const file = await fs.readFile(catalogFile, 'utf8')
    const result = JSON.parse(file).catalog
    cache = result

    return result
  } catch (error) {
    throw error
  }
}

const getAllCategories = async function () {
  try {
    let categories = []
    const catalog = await initCatalog()

    if (catalog) {
      catalog.forEach(c => categories.push({
        id: c.categoryId,
        name: c.categoryName
      }))
    }
    return categories
  } catch (err) {
    console.error(err)
    throw err
  }
}

const getItemsByCategoryId = async function (categoryId) {
  return initCatalog().then(catalog => {
    const items = []
    const category = catalog.find(c => c.categoryId === categoryId.toString())
    if (category && category.items && category.items.length > 0) {
      category.items.forEach(item => items.push({
        ...item,
        categoryId: category.categoryId,
        category: category.categoryName
      }))
    }
    return items
  })
}

const getItem = async function (categoryId, itemId) {
  return getItemsByCategoryId(categoryId).then(items => {
    return items.find(i => i.itemId === itemId)
  })
}

module.exports = {
  getAllCategories,
  getItemsByCategoryId,
  getItem
}
