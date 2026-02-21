import './stats.css';
import VaccinationData from '../organism/vaccinationdata/VaccinationData'
import LatestStats from '../organism/lateststats/LatestStats';
import Trends from '../organism/trends/Trends';

function Stats() {

    return <div className='stats'>
        <LatestStats></LatestStats>
        <VaccinationData></VaccinationData>
        <Trends></Trends>
    </div>

}

export default Stats;