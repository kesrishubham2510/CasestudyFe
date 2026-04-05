import ComparisionCard from '../../atom/comparisionCard/ComparisionCard';
import './comparision.css';

import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';

function Comparision() {

    const location = useLocation();
    const receivedData = location.state || {};
    const appContext = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {

         if(Object.keys(receivedData).length === 0){
            console.log('No data is available to render on the page, moving to static page');
         }

         if ((appContext.state!=null && appContext.state.offlineMode!=null && appContext.state.offlineMode === true) 
           || (Object.keys(receivedData).length === 0)) {
            navigate('/covid-info');
        }
    }, []);

    return <section className="comparision-page">
        <h3>
            Covid-19 Stats Comparision
            {receivedData.referencedDate
                ? ` || ${receivedData.referencedDate}`
                : ` || ${appContext.state.beginningDate}`}
        </h3> 
        <div className='comparisionGrid'>

            { !(Object.keys(receivedData).length === 0) && 
                receivedData?.data.map(countryStat => {
                    return <ComparisionCard key={countryStat.country} country={countryStat.country || "Abcd"} totalCases={countryStat.noOfCases || 0} recovered={countryStat.noOfRecoveries || 0} activeToday={countryStat.activeAsToday || 0} dosesAdministered={countryStat.dosesAdministeredInCountry || 0} />

                })
            }
        </div>
    </section>
}

export default Comparision;