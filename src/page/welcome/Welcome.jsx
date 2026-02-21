import { useState } from "react";
import { useContext } from "react";

import './welcome.css';
import { AppContext } from "../../context/AppContext";

function Welcome() {

    var countryNameInitial = '';
    var appContext = useContext(AppContext);
   
    const [countryName, setCountryName] = useState(countryNameInitial);

    function captureInput(event) {
        const country = event.target.value;

        console.log(country)

        setCountryName(country);
    }

    function submitForm(event) {
        console.log(countryName);
    }

    return <section className="search-bar">
        <h2>{appContext.state.dashboardTitle}</h2>
        <div className='input'>
            <form onSubmit={submitForm}>
                <input id='countryName' type='text' value={countryName} onChange={captureInput} placeholder='Please enter your country name'></input>
                <input id='referenceDate' type='date' min={appContext.state.beginningDate || "2020-01-21"}></input>
            </form>
        </div>
        <button className="searchButton">Search</button>
    </section>
}

export default Welcome;