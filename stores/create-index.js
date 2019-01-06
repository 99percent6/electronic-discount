let els = require('elasticsearch')
let client = new els.Client({
  host: 'http://localhost:9200',
  log: 'error',
  apiVersion: '5.5',
  requestTimeout: 1000 * 60 * 60,
  keepAlive: false
})
const items = require('./data/common.json')
const mapping = require('./mapping/product_index_mapping')
let increment = 0

function addItems () {
  return new Promise((resolve, reject) => {
    client.indices.exists(
      {
        'index': 'product_catalog'
      },
      function (err, res) {
        if (err) {
          console.error(err)
          console.log('Error in check index exist')
          reject(err)
        }
        if (res) {
          console.log('Start delete index')
          client.indices.delete(
            {
              'index': 'product_catalog'
            },
            function (error, response) {
              if (error) {
                console.error(error)
                console.log('Error in delete index')
                reject(error)
              }
              createIndex()
            }
          )
        } else {
          console.log('Index does not exist')
          createIndex()
        }
      }
    )
    let createIndex = function () {
      console.log('Create index')
      client.indices.create(
        {
          'index': 'product_catalog',
          'body': mapping
        }
      )
      let itemsLength = items.items.length
      let count = 1
      let index = 0
      for (let item of items.items) {
        let oldPrice = []
        let newPrice = []
        if (item.oldPrice) {
          for (let ltr of item.oldPrice) {
            ltr.search(/\d/) >= 0 ? oldPrice.push(ltr) : ''
          }
        }
        if (item.newPrice) {
          for (let ltr of item.newPrice) {
            ltr.search(/\d/) >= 0 ? newPrice.push(ltr) : ''
          }
        }
        oldPrice.length > 0 ? item.oldPrice = parseInt(oldPrice.join('')) : ''
        newPrice.length > 0 ? item.newPrice = parseInt(newPrice.join('')) : ''
      }
      let intervalID = setInterval(function () {
        if (items.items[index] && Object.keys(items.items[index]).length > 0) {
          if (items.items[index].newPrice && items.items[index].oldPrice) {
            client.create({
              index: 'product_catalog',
              type: 'product_item',
              id: ++increment,
              body: items.items[index]
            }, function (error, response) {
              if (error) {
                console.error(error)
                reject(error)
              } else {
                console.log('Added item - ', items.items[index].title)
                console.log('Items length - ', itemsLength)
                console.log('Count - ', count)
                ++count
                ++index
              }
            })
          } else {
            ++count
            ++index
          }
        } else {
          console.log('***************************Finish*****************************')
          clearInterval(intervalID)
          resolve()
        }
      }, 20)
    }
  })
}

addItems()
