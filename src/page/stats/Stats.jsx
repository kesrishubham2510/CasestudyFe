import './stats.css';
import VaccinationData from '../../organism/vaccinationdata/VaccinationData'
import LatestStats from '../../organism/lateststats/LatestStats';
import Trends from '../../organism/trends/Trends';
import { Fragment, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';

function Stats() {

    const appContext = useContext(AppContext);
    const location = useLocation();
    const navigate = useNavigate();
    const receivedData = location.state || {};

    useEffect(() => {
        
        if(Object.keys(receivedData).length === 0){
            console.log('No data is available to render on the page, moving to static page');
        }

        if ((appContext?.state?.offlineMode) || (Object.keys(receivedData)?.length === 0)) {
            navigate('/covid-info');
        }
    }, [appContext?.state?.offlineMode, receivedData]);

    return <div className='stats'>
        {   !(Object.keys(receivedData).length === 0) &&
            <Fragment>
                <h1>Covid-19 update for {receivedData.country}</h1>
                <LatestStats totalCases={receivedData.noOfCases || 0} recovered={receivedData.noOfRecoveries ||  0}  activeToday={receivedData.activeAsToday || 0}/>
                <VaccinationData country={receivedData.country} dosesAdministeredInCountry={receivedData.dosesAdministeredInCountry || 0} dosesAdministeredGlobally={receivedData.dosesAdministeredGlobally || 0} ></VaccinationData>
                <Trends country={receivedData.country} trendsData={receivedData.trends}></Trends>
            </Fragment>
        }
    </div>

}

export default Stats;