import './comparisionCard.css';

function ComparisionCard(props) {

    return <section className='comparisionCard'>
        <h3>{props.country}</h3>
        <div className='comparision-stats'>
            <txt className='txt-heading'>Total Cases</txt>
            <txt className='txt-value'>{props.totalCases}</txt>
        </div>
        <br></br>
        <div className='comparision-stats'>
             <txt className='txt-heading'>Active Cases</txt>
            <txt className='txt-value'>{props.activeToday}</txt>
        </div>
        <br></br>
        <div className='comparision-stats'>
            <txt className='txt-heading'>Vaccinated</txt>
            <txt className='txt-value'>{props.dosesAdministered}</txt>
        </div>
        <br></br>
         <div className='comparision-stats'>
            <txt className='txt-heading'>Recoveries</txt>
            <txt className='txt-value'>{props.recovered}</txt>
        </div>
        <br/>
        {/* <div className='comparision-stats'>
           <txt className='txt-heading'>7-Day Trend</txt>
            <txt className='txt-value'>345678</txt>
        </div>
        <br/>
         <div className='comparision-stats'>
           <txt className='txt-heading'>14-Day Trend</txt>
            <txt className='txt-value'>345678</txt>
        </div> */}

    </section>
}

export default ComparisionCard;