import TextTile from '../texttile/TextTile';

function NumberTile(props){

    function formatNumber(number){
     
        if(!isNaN(parseFloat(number)) && isFinite(Number(number))){
            var parsedNumber = Number(number);
            parsedNumber = parsedNumber.toLocaleString('en-Us');
            return parsedNumber;
        }
    } 

    return <TextTile text={formatNumber(props.number)}></TextTile>
}

export default NumberTile;