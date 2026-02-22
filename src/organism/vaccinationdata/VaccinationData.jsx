import './vaccinationdata.css'
import { useContext } from 'react';
import VaccinationDose from "../../molecule/vaccinationdose/VaccinationDose"
import { AppContext } from '../../context/AppContext';

function VaccinationData(props) {

    const appContext = useContext(AppContext);

    return <section className='vaccinationdose'>
        <h3>Vaccination Date</h3>
        <div className='stat-cards'>
            <VaccinationDose text={`Doses administered in ${props.country}`} number={props.dosesAdministeredInCountry || 0}></VaccinationDose>
            <VaccinationDose text="Doses administered Globally" number={props.dosesAdministeredGlobally || 0}></VaccinationDose>
        </div>
    </section>
}

export default VaccinationData;