const fs = require("fs");
console.log('Starting create common json file...');
let mvideoItems = JSON.parse(fs.readFileSync("stores/data/mvideo.json", "utf8"));
let eldoItems = JSON.parse(fs.readFileSync("stores/data/eldorado.json", "utf8"));
let commonItems = {
  items: mvideoItems.items.concat(eldoItems.items)
}
fs.writeFileSync("stores/data/common.json", JSON.stringify(commonItems, '', 1));
console.log('....done!');
