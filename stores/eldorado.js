const osmosis = require('osmosis');
const fs = require("fs");
const url = 'https://www.eldorado.ru'

osmosis
  .get('https://www.eldorado.ru/promo/prm-summer-discount/')
  .find('.items')
  .set({
    items:[
      osmosis.find('.item')
      .set({
        title: '.item__descr a.descr_name',
        oldPrice: '.item__descr .descr__prices p',
        newPrice: '.item__descr .descr__prices h3',
        imageLink: '.item__images .images_goods img@src'
      })
    ]
  })
  .data(function(data) {
    for (let itm of data.items) {
      itm.imageLink = url + itm.imageLink;
      itm.newPrice = itm.newPrice.substring(0, itm.newPrice.length - 2);
      itm.oldPrice = itm.oldPrice ? itm.oldPrice.substring(0, itm.oldPrice.length - 2) : '';
      itm.store = 'Eldorado'
    }
    fs.writeFileSync("stores/data/eldorado.json", JSON.stringify(data, '', 1));
  })
