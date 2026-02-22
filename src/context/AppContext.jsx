//  to store the central state, like country for which the page is rendered

import { createContext, useState } from "react";

const appStateInit = {
    'currCountry': 'India',
    'country1': '',
    'country2': '',
    'country3': '',
    'country4': '',
    // The date of first covid-19 case report'
    'toggleButtonText':'Enable Offline Mode',
    'beginningDate': '2020-02-05',
    'dateFormat': 'dd-MM-yyyy',
    'dashboardTitle': 'Covistat',
    'offlineMode': false
}


const AppContext = createContext();

const AppContextProvider = ({children}) => {
    
    const [state, setState]  = useState(appStateInit);

    return <AppContext.Provider value={{state, setState}}>
        {children}
    </AppContext.Provider>
}

// consumable
export {AppContext};

// provider
export default AppContextProvider;

