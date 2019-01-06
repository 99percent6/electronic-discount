import { slugify } from './slugify'
const esHost = 'localhost:9200'
const esIndex = 'product_catalog'

export function quickSearchByQuery ({ query = null, size = 20, from = 0, sort = 'title:asc' }) {
  return new Promise(function (resolve, reject) {
    let params = {
      method: 'POST',
      mode: 'cors',
      json: true,
      headers: {
        'accept': 'application/json, charset=UTF-8, text/plain, */*',
        'content-type': 'application/json'
      }
    }
    if (query) {
      Object.assign(params, { body: JSON.stringify(query) })
    }
    fetch(`http://${esHost}/${esIndex}/_search?size=${size}&from=${from}&sort=${sort}`, params).then(result => {
      return result.json()
    }).then(response => {
      if (response.hits && response.hits.hits && response.hits.total > 0) {
        let items = []
        for (let item of response.hits.hits) {
          Object.assign(item._source, {
            id: parseInt(item._id),
            slug: slugify(item._source.title)
          })
          items.push(item._source)
        }
        response.hits.hits = items
        resolve(response)
      }
    }).catch(error => {
      console.error(error)
      reject(error)
    })
  })
}
