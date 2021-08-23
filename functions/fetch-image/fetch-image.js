const axios = require('axios')

const handler = async (event) => {
const {term} = event.queryStringParameters;

const client_id = process.env.client_id

  const url = `https://api.unsplash.com/search/photos/?client_id=${client_id}&query=${term}`;
  
try {
  const {data} = await axios.get(url)

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
} catch (error) {
const {status, statusText, headers, data} = error.response
return {
  statusCode: status,
  body: JSON.stringify(status, statusText, headers, data)
}
}
}

module.exports = { handler }
