import './trends.css';
import '../../molecule/trendtile/TrendTile'

import TrendTile from '../../molecule/trendtile/TrendTile';

function Trends(props){
    return <section className='trends'>
        <TrendTile header="Country Insights" data={props.trendsData[props.country]}></TrendTile>
        <TrendTile header="Global Insights" data={props.trendsData.global}></TrendTile>
    </section>
}

export default Trends;