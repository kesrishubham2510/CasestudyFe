const communicationProtocol = 'http://';
const hostName = 'localhost:8080';

const getLatestStatsForCountry = communicationProtocol + hostName + '/api/covid-stat/v1/countries/{country}?referencedDate={referencedDate}';
const getComparativestats = communicationProtocol + hostName + '/api/covid-stat/v1/countries/compare?country1={country1}&country2={country2}&country3={country3}&country4={country4}';

export default {
    'latestStat': getLatestStatsForCountry,
    'getComparision': getComparativestats
}