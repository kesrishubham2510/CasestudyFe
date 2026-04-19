const communicationProtocol = 'http://';
const hostName = 'localhost:8080';

const getLatestStatsForCountry = communicationProtocol + hostName + '/api/covid-stat/v1/countries/{country}?referencedDate={referencedDate}';
const getComparativestats = communicationProtocol + hostName + '/api/covid-stat/v1/countries/compare';
const supportedCountries = communicationProtocol + hostName + '/api/covid-stat/v1/countries/supportedCountries';

export default {
    'latestStat': getLatestStatsForCountry,
    'getComparision': getComparativestats,
    'supportedCountries': supportedCountries
}