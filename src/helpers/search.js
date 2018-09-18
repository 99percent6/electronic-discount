import axios from 'axios'
const esHost = 'localhost:9200'
const esIndex = 'product_catalog'

export function quickSearchByQuery ({ query = {}, size = 20, from = 0, sort = 'title:asc' }) {
  return new Promise(function (resolve, reject) {
    return axios({
      url: `http://${esHost}/${esIndex}/_search?size=${size}&from=${from}&sort=${sort}`,
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      data: query,
      json: true
    }).then(response => {
      if (response.data.hits && response.data.hits.hits && response.data.hits.total > 0) {
        let items = []
        for (let item of response.data.hits.hits) {
          Object.assign(item._source, { id: parseInt(item._id) })
          items.push(item._source)
        }
        response.data.hits.hits = items
        resolve(response.data)
      }
    }).catch(error => {
      console.error(error)
      reject(error)
    })
  })
}
