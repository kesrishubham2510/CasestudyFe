import './vaccinationdata.css'
import { useContext } from 'react';
import VaccinationDose from "../../molecule/vaccinationdose/VaccinationDose"
import { AppContext } from '../../context/AppContext';

function VaccinationData() {

    const appContext = useContext(AppContext);

    return <section className='vaccinationdose'>
        <h3>Vaccination Date</h3>
        <div className='stat-cards'>
            <VaccinationDose text={`Doses administered in ${appContext.state.currCountry}`} number='23456774567'></VaccinationDose>
            <VaccinationDose text="Doses administered Globally" number='23456774567'></VaccinationDose>
        </div>
    </section>
}

export default VaccinationData;