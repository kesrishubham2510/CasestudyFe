import './datatile.css';

function DataTile(props) {

    function getSymbol(direction) {
        if (direction === 'DOWN') {
            return '⬇';
        } else if (direction === 'UP') {
            return '⬆';
        }
    }

    return <section className='data-tile'>
        <div className='dailyavg'>
            Avg:- {Math.floor(Number(props.dailyAverage)).toLocaleString('en-US')} 
        </div>
        <div className='days-info'>
            {props.days} Days
        </div>
        <div className='changerate'>
            {getSymbol(props.direction)} {props.change.toFixed(2)}
        </div>
        <div className='alert-message'>
            <h5>{props.message}</h5>
        </div>
    </section>
}

export default DataTile;