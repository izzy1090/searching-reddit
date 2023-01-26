export let threadCount;

function ThreadCount( ) {
    function handleChange (number) {
        threadCount = number.target.value
    }
    const startingCount = 10;
    const fieldMessage = "Enter thread count: "
    return(
        <>
        <div className="count-flex">
        <div className="field-name">{fieldMessage}</div><input
            className="thread-count" 
            type='number' 
            min={1}
            placeholder={startingCount}
            onChange={ handleChange }>
        </input>
        </div>
        </>
    )
}

export default ThreadCount