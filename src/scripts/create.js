let els = require('elasticsearch');
let client = new els.Client({
    host: 'http://localhost:9200',
    log: 'error',
    apiVersion: '5.5',
    requestTimeout: 1000 * 60 * 60,
    keepAlive: false
});
const items = require('../../stores/data/common.json');
const mapping = require('./mapping/product_index_mapping');
let increment = 0

function addItems () {
  return new Promise((resolve, reject) => {
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
      for (let ltr of item.oldPrice) {
        ltr.search(/\d/) >= 0 ? oldPrice.push(ltr) : ''
      }
      for (let ltr of item.newPrice) {
        ltr.search(/\d/) >= 0 ? newPrice.push(ltr) : ''
      }
      oldPrice.length > 0 ? item.oldPrice = parseInt(oldPrice.join('')) : ''
      newPrice.length > 0 ? item.newPrice = parseInt(newPrice.join('')) : ''
    }
    let intervalID = setInterval(function () {
      if (items.items[index] && Object.keys(items.items[index]).length > 0) {
        delete items.items[index].id
        client.create({
          index: 'product_catalog',
          type: 'product_item',
          id: ++increment,
          body: items.items[index]
        }, function (error, response) {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            console.log('Added item - ', items.items[index].title);
            console.log('Items length - ', itemsLength);
            console.log('Count - ', count);
            ++count
            ++index
          }
        })
      } else {
        console.log('***************************Finish*****************************');
        clearInterval(intervalID);
        resolve()
      }
    }, 10)
  })
}

addItems();
