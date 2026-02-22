import './comparisionCard.css';

function ComparisionCard() {

    return <section className='comparisionCard'>
        <h3>Country name</h3>
        <div className='comparision-stats'>
            <txt className='txt-heading'>Total Cases</txt>
            <txt className='txt-value'>345678</txt>
        </div>
        <br></br>
        <div className='comparision-stats'>
             <txt className='txt-heading'>Active Cases</txt>
            <txt className='txt-value'>345678</txt>
        </div>
        <br></br>
        <div className='comparision-stats'>
            <txt className='txt-heading'>Vaccinated</txt>
            <txt className='txt-value'>345678</txt>
        </div>
        <br></br>
        <div className='comparision-stats'>
           <txt className='txt-heading'>7-Day Trend</txt>
            <txt className='txt-value'>345678</txt>
        </div>
        <br/>
         <div className='comparision-stats'>
           <txt className='txt-heading'>14-Day Trend</txt>
            <txt className='txt-value'>345678</txt>
        </div>

    </section>
}

export default ComparisionCard;