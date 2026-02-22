import ComparisionCard from '../../atom/comparisionCard/ComparisionCard';
import './comparision.css';

function Comparision() {

    return <section className="comparision-page">
        <h3 >Covid-19 Stats Comparision</h3>
        <div className='comparisionGrid'>
            <ComparisionCard />
            <ComparisionCard />
            <ComparisionCard />
            <ComparisionCard />
        </div>

    </section>
}

export default Comparision;