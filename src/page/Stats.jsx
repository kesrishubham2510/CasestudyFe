import './stats.css';
import VaccinationData from '../organism/vaccinationdata/VaccinationData'
import LatestStats from '../organism/lateststats/LatestStats';
import Trends from '../organism/trends/Trends';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Stats() {

    const appContext = useContext(AppContext);

    console.log(appContext.state.currCountry);

    return <div className='stats'>
        <h1>Covid-19 update for {appContext.state.currCountry}</h1>
        <LatestStats></LatestStats>
        <VaccinationData></VaccinationData>
        <Trends></Trends>
    </div>

}

export default Stats;