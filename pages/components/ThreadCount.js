export let threadCount;

function ThreadCount( ) {
    function handleChange (number) {
        threadCount = number.target.value
    }

    const fieldMessage = "Enter thread count"
    return(
        <>
        <div className="count-flex text-xs">
            <div className="field-name">{fieldMessage}</div><input
                className="thread-count" 
                type='number' 
                min={1}
                placeholder={threadCount}
                onChange={ handleChange }>
            </input>
        </div>
        </>
    )
}

export default ThreadCount