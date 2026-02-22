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
        <h1>Covid-19 update for {receivedData.country}</h1>
        <LatestStats totalCases={receivedData.noOfCases || 0} recovered={receivedData.noOfRecoveries ||  0}  activeToday={receivedData.activeAsToday || 0}/>
        <VaccinationData country={receivedData.country} dosesAdministeredInCountry={receivedData.dosesAdministeredInCountry || 0} dosesAdministeredGlobally={receivedData.dosesAdministeredGlobally || 0} ></VaccinationData>
        <Trends country={receivedData.country} trendsData={receivedData.trends}></Trends>
    </div>

}

export default Stats;