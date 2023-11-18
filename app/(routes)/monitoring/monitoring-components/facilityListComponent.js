"use client"
import { useEffect, useState } from "react";
import { states, lga, facilities } from "../../data/facilityList";
import Select from 'react-select'
import Button from "./button";
import axios from 'axios';
import { Form } from "react-bootstrap";
import { useContext } from "react";
import FacilityContext from "../context/facilityListContext";


function FacilityListComponent({handleFunction}) {
    const {
        selectedState, setSelectedState,
        selectedLGAs, setSelectedLGAs,
        selectedFacility, setSelectedFacility,
        startDate, setStartDate,
        endDate, setEndDate
        
    } = useContext(FacilityContext)
    const [filteredLGAs, setFilteredLGAs] = useState()
    const [filteredFacility, setFilteredFacility] = useState()
    const today = new Date().toISOString().split("T")[0];
    const [users, setUsers] = useState([]);
    
    const handleState = (data) =>{
        const selectedStateIds = Array.from(data, dt => dt.value );
        setSelectedState(selectedStateIds);
        const filter_state = lga.filter((lga) => {
            return selectedStateIds.some((state) =>{
                return state === lga.stateid
            })
        })
        setFilteredLGAs(filter_state)
    }
    
    const handleLGA = (data) =>{
       const selectedLGAIds = Array.from(data, dt => dt.value);
       setSelectedLGAs(selectedLGAIds);
       const filter_facility = facilities.filter((fac) =>{
        return selectedLGAIds.some((lga) => {
            return lga === fac.lgaid
        })
       })
    setFilteredFacility(filter_facility)
    }

    
    //handles the facility options changes. 
    const handleFacility = (data) =>{
        const selectedFacilityIds = Array.from(data, dt => +dt.value);
        setSelectedFacility(selectedFacilityIds)
        console.log(selectedFacilityIds)
    }

  return (
    <>
    <form method="post" onSubmit={handleFunction}>

        <div className="form-group my-3">
            <label className="form-label fw-bold">State:</label>
            <Select
                name = "state"
                options={states}
                placeholder="select States"
                isMulti
                onChange={handleState}
            />
        </div>
        <div className="form-group my-3">
            <label className="form-label fw-bold">LGA:</label>
            <Select
                name = "lga"
                options={filteredLGAs}
                placeholder="select LGA"
                isMulti
                onChange={handleLGA}
            />
        </div>
        <div className="form-group my-3">
            <label className="form-label fw-bold">Facility:</label>
            <Select
                name = "lga"
                options={filteredFacility}
                placeholder="select facility"
                isMulti
                onChange={handleFacility}
                
            />
        </div>
        <div className="form-group my-3">
            <label className="form-label fw-bold">Start Date:</label>
            <input type="date" name="startDate" className="form-control" max={today} 
                onChange={(e) => setStartDate(e.target.value)}
                required
            />
        </div>
        <div className="form-group my-3">
            <label className="form-label fw-bold">End Date:</label>
            <input type="date" name="endDate" className="form-control" max={today}
                onChange={(e) => setEndDate(e.target.value)}
                required
                />
        </div>

        <div className="form-group my-3">
        
        <Button text="Load Data" type="submit" />
        </div>
    </form>
    
    </>
  )
}

export default FacilityListComponent