const axios = require('axios')
const baseUrl = 'https://api.covid19api.com'

async function getSummary () {
    const data = await axios.get(baseUrl+'/summary')
    
    const dataMaped = data.data.Countries.map((country) => {
        return {
            countryName: country.Slug,
            countyTotalConfirmed: country.TotalConfirmed,
            countyTotalDeaths: country.TotalDeaths,
            countyTotalRecovered: country.TotalRecovered
        }
    })
    return dataMaped
}

async function getCountryDataChart (Getcountry, type) {
  const data = await axios.get(`${baseUrl}/total/country/${Getcountry}/status/${type}`)
  return data.data
    
}
async function getAllStatus (Getcountry) {
    const data = await axios.get(`https://api.covid19api.com/total/dayone/country/${Getcountry}`)
    return data.data
}

async function getMyCounty () {
    const data = await axios.get('https://www.cloudflare.com/cdn-cgi/trace')
    const countryCode = data.data.split('\n')[8].split('=')[1]
    return countryCode
}
module.exports =  {
    getSummary,
    getCountryDataChart,
    getMyCounty,
    getAllStatus
}