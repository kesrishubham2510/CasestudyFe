import './lateststat.css'

import TextTile from '../../atom/texttile/TextTile';
import NumberTile from '../../atom/numbertile/NumberTile';

function LatestStat(props) {

    return <div className='stat-tile'>
        <img className='stat-img' src={props.image}></img>
        <div className='data-stat'>
            <div className='data-stat-text'>
                <TextTile text={props.text}></TextTile>
            </div>
            <div className='data-stat-number'>
                <NumberTile number={props.number}></NumberTile>
            </div>
        </div>
    </div>

}

export default LatestStat;