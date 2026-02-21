import { useState } from "react";
import { useContext } from "react";

import './welcome.css';
import { AppContext } from "../../context/AppContext";

function Welcome() {


    var appContext = useContext(AppContext);

    var countryFieldStateInitial = {
        'countryName': '',
        'err': '',
        'referenceDate': appContext.state.beginningDate
    };

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

    function searchStats() {
        const formattedDate = formatDate(countryFieldState.referenceDate);

        if (countryFieldState.countryName.trim === '' || countryFieldState.countryName === '') {
            return;
        }

        console.log(countryFieldState.countryName, formattedDate)
    }

    function formatDate(dateString) {
        const [year, month, day] = dateString.split("-");
        return `${day}-${month}-${year}`;
    }
    return <section className="search-bar">
        <h2>{appContext.state.dashboardTitle}</h2>
        <div className='input'>
            <form>
                <input id='countryName' type='text' value={countryFieldState.countryName} onChange={captureInput} placeholder='Please enter your country name'></input>
                <input id='referenceDate' type='date' min={countryFieldState.referenceDate || "2020-02-05"} onChange={captureInput} value={countryFieldState.referenceDate}></input>
            </form>
        </div>
        <button className="searchButton" onClick={searchStats}>Search</button>
    </section>
}

export default Welcome;