import { useEffect, useState } from "react";
import { useContext } from "react";

import './welcome.css';
import { AppContext } from "../../context/AppContext";
import Toast from "../../molecule/toast/Toast";
import { dataSource } from "../../connection/APIConnection";
import { useNavigate } from "react-router-dom";
import errors from "../../error/Errors";

function Welcome() {


    var appContext = useContext(AppContext);
    const countries = appContext?.state?.supportedCountries;
    const navigate = useNavigate();

    useEffect(() => {
        if (appContext.state.offlineMode === true) {
            navigate('/covid-info');
            return;
        }

        if (countries?.length) {
            return;
        }

        const fetchSupportedCountries = async () => {

            try {
                const availableCountries = await dataSource.supportedCountries(
                    process.env.REACT_APP_API_KEY
                );

                appContext.setState((prevState) => ({
                    ...prevState,
                    'supportedCountries': availableCountries
                }));

            } catch (error) {
                console.error('Error fetching supported countries:', error);
            }
        };

        console.log("Getting supported countries from API:- ");
        fetchSupportedCountries();

    }, [countries]);


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
        if (countries.indexOf(country) === -1) {
            return false;
        }

        return true;
    }

    async function searchStats() {
        const formattedDate = formatDate(countryFieldState.referenceDate);

        if (countryFieldState.countryName.trim() === '' || countryFieldState.countryName === '') {
            return;
        }

        const comparisionCountries = countryFieldState.countryName.split(',').map(country => country?.trim()).filter(country => country?.length != 0);
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
            if (comparisionCountries.length === 1) {
                receivedData = await dataSource.countryStats(process.env.REACT_APP_API_KEY, countryFieldState.countryName, formattedDate);
                navigate('/stats', { state: receivedData });
            } else {
                receivedData = await dataSource.comparisionStats(process.env.REACT_APP_API_KEY, comparisionCountries, formattedDate);
                let data = {
                    'referencedDate': formattedDate,
                    'data': receivedData
                }
                navigate('/comparision', { state: data });
            }
        } catch (error) {

            if (error instanceof errors.networkError) {
                console.log('Will display static page about Covid-19');
                navigate('/covid-info', { state: { loadedDueToError: true } });
            }

            setcountryFieldState((prevState) => {
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