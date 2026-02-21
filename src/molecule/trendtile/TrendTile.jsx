import './trendtile.css';

import DataTile from '../datatile/DataTile';

function TrendTile(props) {
    return <div className='trends-data'>
        <h3>{props.header}</h3>
        <div className='trendsdata-card'>
            <DataTile dailyAverage={props.dailyAverage} days={props.days} change={props.change} direction={props.direction} message={props.message}></DataTile>
            <DataTile dailyAverage={props.dailyAverage} days={props.days} change={props.change} direction={props.direction} message={props.message}></DataTile>
        </div>
    </div>
}

export default TrendTile;