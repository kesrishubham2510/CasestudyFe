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
        <h3 >Covid-19 Stats Comparision</h3>
        <div className='comparisionGrid'>
            <ComparisionCard />
            <ComparisionCard />
            <ComparisionCard />
            <ComparisionCard />
        </div>

    </section>
}

export default Comparision;