import './stats.css';
import VaccinationData from '../../organism/vaccinationdata/VaccinationData'
import LatestStats from '../../organism/lateststats/LatestStats';
import Trends from '../../organism/trends/Trends';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';

function Stats() {

    const appContext = useContext(AppContext);
    const location = useLocation();
    const navigate = useNavigate();
    const receivedData = location.state;

    useEffect(() => {
        if (appContext.state.offlineMode === true) {
            navigate('/covid-info');
        }
    }, []);

    return <div className='stats'>
        <h1>Covid-19 update for {appContext.state.currCountry}</h1>
        <LatestStats></LatestStats>
        <VaccinationData></VaccinationData>
        <Trends></Trends>
    </div>

}

export default Stats;