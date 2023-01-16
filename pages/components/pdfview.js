import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const GeneratePDF = dynamic(() => import('./pdf'), {
    ssr: false,
})

const View = () =>{
    const [client, setClient] = useState(false)

    useEffect(()=>{
        setClient(true)
    }, [])

    return (
        <GeneratePDF/>
    )
}

export default View