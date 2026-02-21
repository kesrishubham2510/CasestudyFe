import './trends.css';
import '../../molecule/trendtile/TrendTile'

import TrendTile from '../../molecule/trendtile/TrendTile';

function Trends(){
    return <section className='trends'>
        <TrendTile header="Country Insights" days='7' dailyAverage="123456" change="12.24%" direction="DOWN" message="Situation Worsening"></TrendTile>
        <TrendTile header="Global Insights" days='14' dailyAverage="1243353" change="100.00%" direction="UP" message="Improving"></TrendTile>
    </section>
}

export default Trends;