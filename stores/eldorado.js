const osmosis = require('osmosis');
const fs = require("fs");
const url = 'https://www.eldorado.ru'
let increment = 0
console.log('Start Eldorado parsing!');
fs.writeFileSync("stores/data/eldorado.json", JSON.stringify({ "items": [] }));
console.log('Clear json file');

osmosis
  .get('https://www.eldorado.ru/special/693804202/')
  .paginate('.catalogSection .rightColumn .goodsList .q-catalog-navigation-container .pager .prevNextButtons a[href].buttonNext')
  .find('.goodsList')
  .set({
    items:[
      osmosis.find('.item')
      .set({
        title: '.itemInfo .itemDescription .itemTitle a',
        oldPrice: '.buyBox .priceContainer .actionPriceBigDiscount div span.oldPrice',
        newPrice: '.buyBox .priceContainer .actionPriceBigDiscount span.discountPrice',
        imageLink: '.itemInfo .itemPicture a > img@src',
        itemLink: '.itemInfo .itemDescription .itemTitle a@href'
      })
    ]
  })
  .data(function(data) {
    for (let itm of data.items) {
      itm.itemLink = url + itm.itemLink;
      itm.newPrice = itm.newPrice ? itm.newPrice.substring(0, itm.newPrice.length - 2) : '';
      itm.oldPrice = itm.oldPrice ? itm.oldPrice.substring(0, itm.oldPrice.length - 2) : '';
      itm.store = 'Eldorado';
      itm.created_at = new Date();
      itm.startDate = new Date(2018, 8, 11, 4, 0, 0, 0);
      itm.finishDate = new Date(2018, 9, 8, 4, 0, 0, 0);
    }
    console.log('Count of new items - ', data.items.length);
    let currentData = fs.readFileSync("stores/data/eldorado.json", "utf8");
    currentData = JSON.parse(currentData)
    let newData = {
      items: currentData.items.concat(data.items)
    };
    console.log('Count of all items', newData.items.length);
    fs.writeFileSync("stores/data/eldorado.json", JSON.stringify(newData, '', 1));
  })
