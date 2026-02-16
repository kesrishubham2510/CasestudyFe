import NumberTile from '../../atom/numbertile/NumberTile';
import TextTile from '../../atom/texttile/TextTile';
import './datatile.css';

function DataTile(props){

    return <div className='data-tile'>
        <div className='data-tile-daily-avg'>
            Daily Avg. <NumberTile number={props.dailyAverage}></NumberTile>
        </div>
        <div className='data-tile-change'>
            <TextTile text={props.direction}></TextTile> {props.change}  
        </div>
        <div>
            <TextTile text={props.message}/>
        </div>
    </div>
}

export default DataTile;