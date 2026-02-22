import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import './pagetemplate.css';

import { useContext } from 'react';

function PageTemplate(props) {

    const navigate = useNavigate();
    const location = useLocation();
    const appContext = useContext(AppContext);

    function navigateToHome() {
        console.log('Navigating to home')
        navigate('/');
    }

    function toggleOfflineMode() {


        if (appContext.state.offlineMode === false) {
            console.log('Enabling offline mode');
            appContext.setState((prevState) => {
                return {
                    ...prevState,
                    'toggleButtonText': 'Enable Online Mode',
                    'offlineMode': true
                }
            })

            navigate('/covid-info');
        }

        if (appContext.state.offlineMode === true) {
            console.log('Enabling online mode');
            appContext.setState((prevState) => {
                return {
                    ...prevState,
                    'toggleButtonText': 'Enable Offline Mode',
                    'offlineMode': false
                }
            })

            navigateToHome();
        }
    }

    return <div className='page-template'>
        <header className='page-header'>
            <div>
                <button className='header-button' onClick={() => navigateToHome()} disabled={location.pathname=='/' || appContext.state.offlineMode}>Home</button>
            </div>
            <div>
                <button className='header-button'  onClick={() => toggleOfflineMode()}>{appContext.state.toggleButtonText}</button>
            </div>
        </header>
        <div className='page-content'>
            {props.component}
        </div>
    </div>
}

export default PageTemplate;