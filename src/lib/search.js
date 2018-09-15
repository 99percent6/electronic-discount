import request from 'request'
const esHost = 'localhost:9200'
const esIndex = 'product_catalog'

export function quickSearchByQuery ({ query = {}, size = 20, from = 0, sort = 'title:asc' }) {
  return new Promise(function (resolve, reject) {
    return request({
      url: `http://${esHost}/${esIndex}/_search?size=${size}&from=${from}&sort=${sort}`,
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: query,
      json: true
    }, function (error, response, body) {
      if (error) {
        console.error(error)
        reject(error)
      } else if (body.error) {
        console.error(body.error)
        reject(body.error)
      }
      if (body.hits && body.hits.hits && body.hits.total > 0) {
        let items = []
        for (let item of body.hits.hits) {
          Object.assign(item._source, { id: parseInt(item._id) })
          items.push(item._source)
        }
        body.hits.hits = items
        resolve(body)
      }
    })
  })
}
