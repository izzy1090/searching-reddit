function MetricsDisplay ({ value }) {
    if (value > 1000000){
        const renderedValue = (value / 1000000).toFixed(2) + 'm';
        return renderedValue;
    }
    if (value >= 100000 && value <= 1000000){
        const renderedValue = Math.floor(value / 1000) + 'k';
        return renderedValue;
    }
    if (value >= 10000 && value < 100000){
        const renderedValue = Math.floor(value / 1000) + 'k';
        return renderedValue;
    }
    if (value > 1000){
        const renderedValue = (value / 1000).toFixed(2) + 'k';
        return renderedValue;
    } 
    else return value;
};

export default MetricsDisplay;