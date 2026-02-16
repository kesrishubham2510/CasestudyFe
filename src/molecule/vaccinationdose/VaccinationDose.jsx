import './vaccinationdose.css';

import TextTile from '../../atom/texttile/TextTile';
import NumberTile from '../../atom/numbertile/NumberTile';

function VaccinationDose(props) {
    return <div className='vaccinationdose-tile'>
        <div className='vaccinationdose-datastat'>
            <TextTile text={props.text}></TextTile>
        </div>
        <div className='vaccinationdose-datastat'>
            <NumberTile number={props.number}></NumberTile>
        </div>
    </div>;
}

export default VaccinationDose;