import './lateststats.css';

import covidVirusImage from '../../assets/images/covidVirus.png';
import cautionImage from '../../assets/images/caution.png';
import profileImage from '../../assets/images/DefaulProfileIcon.jpg';

import LatestStat from '../../molecule/lateststat/LatestStat';

function LatestStats() {

    return <section className='lateststats'>
        <h3>National Statistics</h3>
        <section className='stat-cards'>
            <LatestStat text="Total Cases" colour="red" number="123356875" background="red" image={covidVirusImage}></LatestStat>
            <LatestStat text="Total Recovered" colour="yellow" number="123356875" background="orange" image={profileImage}></LatestStat>
            <LatestStat text="Active Today" colour="purple" number="123356875" background="purple" image={cautionImage}></LatestStat>
        </section>
    </section>;
}

export default LatestStats;