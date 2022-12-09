import { useState } from "react"

export let sortSelection = '';

export function DropDown() {
    // declare state variable and setValue function to set the value of sort for API call
    const [value, setValue] = useState('') 

    function changeValue(value) {
        // conditional statement to prevent user from making an API call with "Sort Options"
            // currently the drop down menu doesn't let you select the default display text
            // so this is also a work around for that 
        if (value === 'Sort Options'){
            sortSelection = 'relevance'
        } else sortSelection = value
    }

    return(
        <div onClick={changeValue(value)}>
            <select onChange={(e)=>setValue(e.target.value)} className="sort-dropdown">
                <option value={'Sort Options'}>Sort Options</option>
                <option value={'relevance'}>Relevance</option>
                <option value={'hot'}>Hot</option>
                <option value={'top'}>Top</option>
                <option value={'new'}>New</option>
                <option value={'old'}>Old</option>
            </select>
        </div>
    )
}

export default DropDown