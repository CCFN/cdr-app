"use client"
import { createContext, useState } from "react";


const FacilityContext = createContext();

export function FacilityContextProvider ( {children} ){
    const [selectedState, setSelectedState] = useState([])
    const [selectedLGAs, setSelectedLGAs] = useState([])
    const [selectedFacility, setSelectedFacility] = useState([])
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    return(
        <FacilityContext.Provider value={
            {
                selectedState, setSelectedState,
                selectedLGAs, setSelectedLGAs,
                selectedFacility, setSelectedFacility,
                startDate, setStartDate,
                endDate, setEndDate
                
            }
        }>
            { children }
        </FacilityContext.Provider>
    )
}

export default FacilityContext;