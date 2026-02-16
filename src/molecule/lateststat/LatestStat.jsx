import './lateststat.css'

import TextTile from '../../atom/texttile/TextTile';

function LatestStat(props) {

    return <div className='stat-tile'>
        <img className='stat-img' src={props.image}></img>
        <div className='data-stat'>
            <div className='data-stat-text'>
                <TextTile text={props.text}></TextTile>
            </div>
            <div className='data-stat-number'>
                <TextTile text={props.number}></TextTile>
            </div>
        </div>
    </div>

}

export default LatestStat;