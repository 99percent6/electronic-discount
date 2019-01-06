const osmosis = require('osmosis')
const fs = require('fs')
const url = 'https://www.mvideo.ru'
console.log('Start Mvideo parsing!')
fs.writeFileSync('stores/data/mvideo.json', JSON.stringify({ 'items': [] }))
console.log('Clear json file')

osmosis
  .get('https://www.mvideo.ru/promo/uspeite-kupit-mark28378574')
  .paginate('.o-pagination-section .c-pagination a[href].c-pagination__next')
  .find('.o-plp-container__product-results')
  .set({
    items:[
      osmosis.find('.c-product-tile')
        .set({
          title: '.c-product-tile__description .c-product-tile__description-wrapper h4 a',
          oldPrice: '.c-product-tile__checkout-section .c-pdp-price .c-pdp-price__sale .c-pdp-price__old',
          newPrice: '.c-product-tile__checkout-section .c-pdp-price .c-pdp-price__current',
          imageLink: '.c-product-tile-picture .c-product-tile-picture__holder a .c-product-tile-picture__link img@data-original',
          itemLink: '.c-product-tile__description .c-product-tile__description-wrapper h4 a@href',
          productInfo: '.c-product-tile__description .c-product-tile__description-wrapper h4 a@data-product-info'
        })
    ]
  })
  .data(function (data) {
    for (let itm of data.items) {
      itm.newPrice = itm.newPrice ? itm.newPrice.substring(0, itm.newPrice.length - 1) : ''
      itm.store = 'Mvideo'
      itm.created_at = new Date()
      itm.itemLink = url + itm.itemLink
    }
    console.log('Count of new items - ', data.items.length)
    let currentData = fs.readFileSync('stores/data/mvideo.json', 'utf8');
    currentData = JSON.parse(currentData)
    let newData = {
      items: currentData.items.concat(data.items)
    }
    console.log('Count of all items', newData.items.length);
    fs.writeFileSync('stores/data/mvideo.json', JSON.stringify(newData, '', 1));
  })
