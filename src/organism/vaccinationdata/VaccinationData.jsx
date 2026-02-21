import './vaccinationdata.css'

import VaccinationDose from "../../molecule/vaccinationdose/VaccinationDose"

function VaccinationData() {
    return <section className='vaccinationdose'>
        <h3>Vaccination Date</h3>
        <div className='stat-cards'>
            <VaccinationDose text="Doses administered in India" number='23456774567'></VaccinationDose>
            <VaccinationDose text="Doses administered in India" number='23456774567'></VaccinationDose>
        </div>
    </section>
}

export default VaccinationData;