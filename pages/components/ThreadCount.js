export let threadCount;

function ThreadCount( ) {
    function handleChange (number) {
        threadCount = number.target.value
    }

    const fieldMessage = "Thread count";
    return(
        <>
        <div className="count-flex text-xs">
            <div className="count-field-name">
                {fieldMessage}
            </div>
            <input
                className="count-thread-limit" 
                type='number' 
                min={1}
                placeholder={'Enter #'}
                onChange={ handleChange }>
            </input>
        </div>
        </>
    )
}

export default ThreadCount