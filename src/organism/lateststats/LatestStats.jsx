import './lateststats.css';

import covidVirusImage from '../../assets/images/covidVirus.png';
import cautionImage from '../../assets/images/caution.png';
import profileImage from '../../assets/images/DefaulProfileIcon.jpg';

import LatestStat from '../../molecule/lateststat/LatestStat';

function LatestStats(props) {

    return <section className='lateststats'>
        <h3>National Statistics</h3>
        <section className='stat-cards'>
            <LatestStat text="Total Cases" colour="red" number={props.totalCases || 0} background="red" image={covidVirusImage}></LatestStat>
            <LatestStat text="Total Recovered" colour="yellow" number={props.recovered || 0} background="orange" image={profileImage}></LatestStat>
            <LatestStat text="Active Today" colour="purple" number= {props.activeToday || 0} background="purple" image={cautionImage}></LatestStat>
        </section>
    </section>;
}

export default LatestStats;