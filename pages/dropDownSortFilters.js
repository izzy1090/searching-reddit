import { useState } from "react"

export let sortSelection = '';

export function DropDown() {
    // declare state variable and setValue function to set the value of sort for API call
    const [value, setValue] = useState('') 

    function changeValue(value) {
        sortSelection = value
    }

    return(
        <div onClick={changeValue(value)}>
            <select onChange={(e)=>setValue(e.target.value)} className="sort-dropdown">
                <option value={'relevance'}>relevance</option>
                <option value={'hot'}>hot</option>
                <option value={'top'}>top</option>
                <option value={'new'}>new</option>
                <option value={'comments'}>comments</option>
            </select>
        </div>
    )
}

// export default DropDown