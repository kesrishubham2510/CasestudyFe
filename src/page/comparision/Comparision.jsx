import ComparisionCard from '../../atom/comparisionCard/ComparisionCard';
import './comparision.css';

import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';

function Comparision() {

    const location = useLocation();
    const receivedData = location.state;
    const appContext = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (appContext.state.offlineMode === true) {
            navigate('/covid-info');
        }
    }, []);


    return <section className="comparision-page">
        <h3 >Covid-19 Stats Comparision {receivedData.referencedDate || ` || ${appContext.state.beginningDate}`}</h3>
        <div className='comparisionGrid'>

        {
            receivedData.map(countryStat => {
                return <ComparisionCard key={countryStat.country} country={countryStat.country || "Abcd"} totalCases={countryStat.noOfCases || 0} recovered={countryStat.noOfRecoveries || 0} activeToday={countryStat.activeAsToday || 0} dosesAdministered={countryStat.dosesAdministeredInCountry || 0}/>
                
            })
        }
        </div>
    </section>
}

export default Comparision;