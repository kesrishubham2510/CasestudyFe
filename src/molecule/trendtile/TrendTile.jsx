import './trendtile.css';

import DataTile from '../datatile/DataTile';

function TrendTile(props) {

    var days = 0;

    return <div className='trends-data'>
        <h3>{props.header}</h3>
        <div className='trendsdata-card'>
            {props.data.trends.map(trend => {

                days = Number(days) + 7;

                return <DataTile 
                key = {days}
                dailyAverage={trend.dailyAverage} 
                days={days} 
                change={trend.changePercentage}
                direction={trend.direction} 
                message={trend.alertMessage}/>;
            })}
        </div>
    </div>
}

export default TrendTile;