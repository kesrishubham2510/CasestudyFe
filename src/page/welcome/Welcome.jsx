import { useEffect, useState } from "react";
import { useContext } from "react";

import './welcome.css';
import { AppContext } from "../../context/AppContext";
import Toast from "../../molecule/toast/Toast";
import { dataSource } from "../../connection/APIConnection";
import { useNavigate } from "react-router-dom";

function Welcome() {


    var appContext = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (appContext.state.offlineMode === true) {
            navigate('/covid-info');
        }
    }, []);


    const countries = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burma",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo",
        "Costa Rica",
        "Côte d'Ivoire",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czechia",
        "Denmark",
        "Diamond Princess",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "DRC",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea-Bissau",
        "Guinea",
        "Guyana",
        "Haiti",
        "Holy See",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kosovo",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libyan Arab Jamahiriya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macedonia",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "MS Zaandam",
        "N. Korea",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russia",
        "Rwanda",
        "S. Korea",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Summer Olympics 2020",
        "Suriname",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Tuvalu",
        "UAE",
        "Uganda",
        "UK",
        "Ukraine",
        "Uruguay",
        "USA",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Vietnam",
        "West Bank and Gaza",
        "Winter Olympics 2022",
        "Yemen",
        "Zambia",
        "Zimbabwe"
    ]

    var countryFieldStateInitial = {
        'countryName': '',
        'err': '',
        'referenceDate': appContext.state.beginningDate
    };

    const [infoDisplayed, setInfoDisplayed] = useState(false);
    const [countryFieldState, setcountryFieldState] = useState(countryFieldStateInitial);

    function captureInput(event) {

        event.preventDefault();
        const inputId = event.target.id;
        const value = event.target.value;


        setcountryFieldState((prevState) => {
            return {
                ...prevState,
                [inputId]: value
            };

        });

    }

    function resetError() {
        setcountryFieldState((prevState) => {
            return {
                ...prevState,
                'err': ''
            }
        })
    }

    function validateCountryName(country) {
        if (countries.indexOf(country) == -1) {
            return false;
        }

        return true;
    }

    async function searchStats() {
        const formattedDate = formatDate(countryFieldState.referenceDate);

        if (countryFieldState.countryName.trim() === '' || countryFieldState.countryName === '') {
            return;
        }

        const comparisionCountries = countryFieldState.countryName.split(',');
        console.log('Comparision countries:- ', comparisionCountries);
        var invalidCountry = false;

        comparisionCountries.forEach(country => {

            if (!validateCountryName(country.trim())) {
                setcountryFieldState((prevState) => {
                    return {
                        ...prevState,
                        'err': 'Country:- ' + country.trim() + ', Invalid'
                    }
                });

                invalidCountry = true;
                return;
            }

        });

        if (invalidCountry) {
            return;
        }

        var receivedData = null;

        try {
            if (comparisionCountries.length == 1) {
                receivedData = await dataSource.countryStats(process.env.REACT_APP_API_KEY, countryFieldState.countryName, formattedDate);
                navigate('/stats', { state: receivedData });
            } else {

                if (comparisionCountries.length == 2) {
                    receivedData = await dataSource.comparisionStats(process.env.REACT_APP_API_KEY, comparisionCountries.at(0).trim(), comparisionCountries.at(1).trim(), '', '', formattedDate);
                } else if (comparisionCountries.length == 3) {
                    receivedData = await dataSource.comparisionStats(process.env.REACT_APP_API_KEY, comparisionCountries.at(0).trim(), comparisionCountries.at(1).trim(), comparisionCountries.at(2).trim(), '', formattedDate);
                } else {
                    receivedData = await dataSource.comparisionStats(process.env.REACT_APP_API_KEY, comparisionCountries.at(0).trim(), comparisionCountries.at(1).trim(), comparisionCountries.at(2).trim(), comparisionCountries.at(3).trim(), formattedDate);
                }
                navigate('/comparision', { state: receivedData });
            }
        } catch (error) {

            if (error.message === 'Failed to fetch') {
                console.log('Will display static page about Covid-19');
                navigate('/covid-info', {state: {loadedDueToError: true}});
            }

            setcountryFieldState((prevState) => {
                console.log(prevState);
                return {
                    ...prevState,
                    'err': error.message
                }
            })
        }
    }

    function formatDate(dateString) {
        const [year, month, day] = dateString.split("-");
        return `${day}-${month}-${year}`;
    }
    return <section className="search-bar">
        <h2>{appContext.state.dashboardTitle}</h2>
        <div className='input'>
            <form>
                <input id='countryName' type='text' value={countryFieldState.countryName} onChange={captureInput} placeholder='Provide comma separared country names'></input>
                <input id='referenceDate' type='date' min={countryFieldState.referenceDate || "2020-02-05"} onChange={captureInput} value={countryFieldState.referenceDate}></input>
            </form>
        </div>
        <button className="searchButton" onClick={searchStats}>Search</button>
        {countryFieldState.err.trim().length === 0 ? <div></div> : <Toast
            message={countryFieldState.err}
            type={'error'}
            onClose={resetError}
        />}
        {infoDisplayed ? <div></div> : <Toast
            message={'Use Comma separated country names for comparision'}
            type={'info'}
            onClose={() => setInfoDisplayed(true)}
        />}
    </section>
}

export default Welcome;