import Endpoint from "./Endpoint";
import errors from "../error/Errors.js";

async function fetchCountryStats(apiKey, country, referencedDate) {

    if (!country?.trim()) {
        return;
    }

    let url = Endpoint.latestStat
        .replace('{country}', country)
        .replace('{referencedDate}', referencedDate);

    try {
       
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'API-KEY': apiKey
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }

        if (response.status >= 400 && response.status < 500) {
            const error = await response.text();
            throw new errors.clientError(error, response.status);
        }

        if (response.status >= 500) {
            throw new errors.serverError('Server Error. Please try again later.', response.status);
        }

    } catch (error) {

        if (error instanceof TypeError) {
          console.error("Connectivity Issue | Error fetching country stats:", error.message);
          throw new errors.networkError("Network error. Please check your internet connection.");
        }

        console.error("Error fetching country stats:", error.message);
        throw error;   // rethrow so UI can handle
    }
}

async function fetchCountryComparisionStats(apiKey, countries, referencedDate) {

    let url = Endpoint.getComparision;

    const searchParams = new URLSearchParams();

    countries.forEach((country, index)=> {
        searchParams.append(`country${index+1}`, country);
    });

    if(referencedDate){
        searchParams.append('referencedDate',referencedDate);
    }

    
    url = url.concat('?', searchParams.toString());
    
    try {

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'API-KEY': apiKey
            }
        });

        if (response.ok) {
            const data = await response.json();
         
            return data;
        }

        if (response.status >= 400 && response.status < 500) {
            const error = await response.text();
            throw new errors.clientError(error, response.status);
        }

        if (response.status >= 500) {
            throw new errors.serverError('Server Error. Please try again later.', response.status);
        }


    } catch (error) {

        if (error instanceof TypeError) {
          console.error("Connectivity Issue | Error fetching comparision stats:", error.message);
          throw new errors.networkError("Network error. Please check your internet connection.");
        }
        console.error("Error fetching comparison stats:", error.message);
        throw error;
    }
}

export const dataSource = {
    'countryStats': fetchCountryStats,
    'comparisionStats': fetchCountryComparisionStats
}