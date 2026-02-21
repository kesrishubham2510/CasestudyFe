import Endpoint from "./Endpoint";

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
            throw new Error(`Client Error (${response.status}): ${error}`);
        }

        if (response.status >= 500) {
            throw new Error(`Server Error (${response.status}). Please try again later.`);
        }

    } catch (error) {
        console.error("Error fetching country stats:", error.message);
        throw error;   // rethrow so UI can handle
    }
}

async function fetchCountryComparisionStats(apiKey, country1, country2, country3, country4, referencedDate) {

    let nonEmptyCountries = 0;
    let url = Endpoint.getComparision;

    if (country1?.trim()) {
        nonEmptyCountries++;
        url = url.replace('{country1}', country1);
    }

    if (country2?.trim()) {
        nonEmptyCountries++;
        url = url.replace('{country2}', country2);
    }

    if (country3?.trim()) {
        nonEmptyCountries++;
        url = url.replace('{country3}', country3);
    } else {
        url = url.replace('&country3={country3}', '');
    }

    if (country4?.trim()) {
        nonEmptyCountries++;
        url = url.replace('{country4}', country4);
    } else {
        url = url.replace('&country4={country4}', '');
    }

    if (nonEmptyCountries < 2) {
        throw new Error("At least 2 countries are required for comparison.");
    }

    try {

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'API-KEY': apiKey
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Comparison data:- ', data);
            return data;
        }

        if (response.status >= 400 && response.status < 500) {
            const error = await response.text();
            throw new Error(`Client Error (${response.status}): ${error}`);
        }

        if (response.status >= 500) {
            throw new Error(`Server Error (${response.status}). Please try again later.`);
        }

    } catch (error) {
        console.error("Error fetching comparison stats:", error.message);
        throw error;
    }
}

export const dataSource = {
    'countryStats': fetchCountryStats,
    'comparisionStats': fetchCountryComparisionStats
}