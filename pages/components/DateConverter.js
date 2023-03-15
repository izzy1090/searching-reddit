function DateConverter( {date, className} ){
    // declared variable to initialize with a date object using responses return unix timecode
    const responseDates = new Date(date * 1000)
    // because getMonth() returns integers 0 for Jan., 1 for Feb.
        // I had to increment values below 10 and add a '0' afterwards
    function monthConverter(month) {
        if (month === false){
            return <div>No date available</div>
        }
        if(month >= 0 && month <= 9){
            let monthToIncrement = month;
            monthToIncrement++;
            const addZero = '0' + monthToIncrement;
            return addZero;
        } else return month;
    }
    const months = monthConverter(responseDates.getMonth())
    // format returned date object into an appropriate string
    const createdDate = `${months}/${responseDates.getDate()}/${responseDates.getFullYear()}`;
    return <div className={className}> {createdDate} </div>
}

export default DateConverter;