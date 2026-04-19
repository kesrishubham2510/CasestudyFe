//  to store the central state, like country for which the page is rendered

import { createContext, useState } from "react";

const appStateInit = {
    'currCountry': 'India',
    'toggleButtonText':'Enable Offline Mode',
    'beginningDate': '2020-02-05',
    'dateFormat': 'dd-MM-yyyy',
    'dashboardTitle': 'Covistat',
    'offlineMode': false,
    'supportedCountries': []
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

