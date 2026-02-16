import './trendtile.css';

import TileHeader from '../../atom/tileHeader/TileHeader';
import DataTile from '../datatile/DataTile';

function TrendTile(props){
    return <div className='trends-data'>
        <TileHeader header = {props.header}></TileHeader>
        <DataTile dailyAverage={props.dailyAverage} change={props.change} direction={props.direction} message={props.message}></DataTile>
    </div>
}

export default TrendTile;