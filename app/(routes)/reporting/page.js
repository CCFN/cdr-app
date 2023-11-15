"use client"
import { useContext, useEffect, useState } from "react";
//import { states, lga, facilities } from "../data/facilityList";
//import Select from 'react-select'
import axios from 'axios'
import Papa from 'papaparse'
import { LoaderCover } from "../components/loader";
import { useSession } from "next-auth/react";

function Reporting() {
    const {data: session} = useSession()
    const user = session?.user;
    const [selectedState, setSelectedState] = useState(user?.state.id)

    //const [filteredLGAs, setFilteredLGAs] = useState()
    //const [filteredFacility, setFilteredFacility] = useState()
    
    const today = new Date().toISOString().split("T")[0];

    //const [selectedLGAs, setSelectedLGAs] = useState([])
    const [selectedFacility, setSelectedFacility] = useState()
    const [linelist, setLinelist] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [isDecrypt, setIsDecrypt] = useState(false)
    const [isCSV, setIsCSV] = useState(false)
    const [stateList, setStateList] = useState([])
    const [facilityList, setFacilityList] = useState([])
    const [filteredFacilityList, setFilteredFacilityList] = useState([])
    const [rangType, setRangeType] = useState('')
    const [loading, setLoading] = useState(false)
    
    const url = process.env.baseURL;
    //handles the state options changes. 
    // const handleState = (data) =>{
    //    const selectedStateIds = Array.from(data, dt => dt.value);
    //    setSelectedState(selectedStateIds)
    //    const filter_state = lga.filter((lga) =>{
    //     return selectedStateIds.some((state) => {
    //         return state === lga.stateid
    //     })
    //    })
    // setFilteredLGAs(filter_state)
    // }

    // //handles the LGA options changes. 
    // const handleLGA = (data) =>{
    //    const selectedLGAIds = Array.from(data, dt => dt.value);
    //    setSelectedLGAs(selectedLGAIds)
    //    const filter_facility = facilities.filter((fac) =>{
    //     return selectedLGAIds.some((lga) => {
    //         return lga === fac.lgaid
    //     })
    //    })
    // setFilteredFacility(filter_facility)
    // }

    // //handles the facility options changes. 
    // const handleFacility = (data) =>{
    //     const selectedFacilityIds = Array.from(data, dt => dt.value);
    //     setSelectedFacility(selectedFacilityIds)
    //     console.log(selectedFacilityIds)
    // }
 
// function getFilteredState(){
//     const filter_state = states.filter(state => state.value == selectedState)
//         const sorted_states = filter_state.sort((a,b) => a.label > b.label ? 1 : -1)
//         setFilteredState(sorted_states)
// }
// function getFilteredLGAs(){
//     const filter_lgas = lga.filter(lgas => lgas.stateid == selectedState)
//         const sorted_lgas = filter_lgas.sort((a,b) => a.label > b.label ? 1 : -1)
//         setFilteredLGAs(sorted_lgas)
// }

//     useEffect(() =>{ 
//         //getFilteredState(); 
//         getFilteredLGAs();
//     },[selectedState]);
//Function to download the file

    useEffect(() =>{
        fetchStateAndFacilityList();
    },[user?.roles.includes("ROLE_SUPER_ADMIN")])
    

async function fetchStateAndFacilityList(){
    try {
        const state_list_request = axios.get(`${url}state/`);
        const facility_list_request = axios.get(`${url}locations/all`);
        const [state_list_response, facility_list_response] = await axios.all([state_list_request, facility_list_request]);

        setStateList(state_list_response.data);
        setFacilityList(facility_list_response.data);

    } catch (error) {
        console.log(error)
    }
    
}




const filterFacility = (e) =>{
    const fac = facilityList.filter(facility => facility.state.id === e.target.value);
    setFilteredFacilityList(fac);
    console.log(fac)
}
const exportData = (data, fileName, type) => {
    // Create a link and download the file
    const blob = new Blob([data], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };

function getLineListByDateRange(e){
    e.preventDefault();
    const lineListFilters = {
        state: selectedState,
        facility: +selectedFacility,
        dateFrom: startDate,
        dateTo: endDate,
        decrypt: isDecrypt,
        isCSV: isCSV,
    }
    switch (linelist) {
        case "HTS":
            setLoading(true)
            alert("HTS Linelist Selected")
            break;
    
        case "PMTCT":
            alert("PMTCT Linelist Selected")
            break;

        case "Recency":
            alert("Recency Linelist Selected")
            break;

        case "Tx_New":
            alert("Tx_New Linelist Selected")
            break;

        case "Tx_Curr":
            setLoading(true)
            axios.post(`${url}old_linelist/loadByDateRange`, lineListFilters)
            .then((response) =>{
                const csvData = Papa.unparse(response.data);
                setLoading(false)
                exportData(csvData, `CDR_${linelist}_linelist_${today}`, 'text/csv;charset=utf-8;');
            })
            .catch((error) => {
                console.log(error)
            })
            //console.log(lineListFilters)
            break;
        case "AHD":
            alert("AHD Linelist Selected")
            break;

        case "OTZ":
            alert("OTZ Linelist Selected")
            break;

        case "EAC":
            alert("EAC Linelist Selected")
            break;
    
        default:
            alert("No Linelist Selected")
            break;
    }
}
function getLinelistByEndDate(e){
    e.preventDefault();
    const lineListFilters = {
        state: selectedState,
        facility: +selectedFacility,
        //dateFrom: startDate,
        dateTo: endDate,
        decrypt: isDecrypt,
        isCSV: isCSV,
    }

    switch (linelist) {
        case "HTS":
            alert("HTS Linelist Selected")
            break;
    
        case "PMTCT":
            alert("PMTCT Linelist Selected")
            break;

        case "Recency":
            alert("Recency Linelist Selected")
            break;

        case "Tx_New":
            alert("Tx_New Linelist Selected")
            break;

        case "Tx_Curr":
            setLoading(true)
            axios.post(`${url}old_linelist/loadonce`, lineListFilters)
            .then((response) =>{
                const csvData = Papa.unparse(response.data);
                setLoading(false)
                exportData(csvData, `CDR_${linelist}_linelist_${startDate}_to_${endDate}`, 'text/csv;charset=utf-8;');
            })
            //console.log(lineListFilters)
            break;
        case "AHD":
            alert("AHD Linelist Selected")
            break;

        case "OTZ":
            alert("OTZ Linelist Selected")
            break;

        case "EAC":
            alert("EAC Linelist Selected")
            break;
    
        default:
            alert("No Linelist Selected")
            break;
    }
}

  return (
    <>
    {
        loading ? <LoaderCover /> : null
    }
    <div className="container">
        <div className="row">
            <div className="col-sm-12 text-center p-3">
                <h3>Download Linelists</h3>
            </div>
            <div className="col-sm-12 p-5 linelist-bar">

                <form className="form">
                    <div className="row">
                        <div className="col-md-4 form-group my-3">
                            <label className="form-label fw-bold">Linelist Type:</label>
                            <select name="linelist" className="form-select" 
                                onChange={(e) => setLinelist(e.target.value)}>
                                <option></option>
                                <option>HTS</option>
                                <option>PMTCT</option>
                                <option>Recency</option>
                                <option>Tx_New</option>
                                <option>Tx_Curr</option>
                                <option>AHD</option>
                                <option>OTZ</option>
                                <option>EAC</option>
                            </select>
                        </div>
                        <div className="col-md-4 form-group my-3">
                        <label className="form-label fw-bold">State:</label>
                        {/* <Select
                                name = "state"
                                options={states}
                                placeholder="select state"
                                isMulti
                                onChange={handleState}
                            /> */}
                            <select name="state" className="form-select"
                                onChange={(e) => {setSelectedState(e.target.value); filterFacility(e)}}>
                                {
                                    user?.roles.includes("ROLE_SUPER_ADMIN") ?
                                    stateList.map((state, index) =>
                                    <>
                                        <option key={index} value={state.id}>{state.stateName}</option>
                                    </>
                                    )
                                    :
                                    <option value={user?.state.id}>{user?.state.stateName}</option>
                                }
                            </select>

                        </div>
                        <div className="col-md-4 form-group my-3">
                            <label className="form-label fw-bold">Facility:</label>
                            {/* <Select
                                name = "lga"
                                options={filteredLGAs}
                                placeholder="select LGA"
                                isMulti
                                onChange={handleLGA}
                            /> */}
                            <select name="facility" className="form-select" 
                                onChange={(e) => setSelectedFacility(e.target.value)}>
                                    <option></option>
                                    {
                                        user?.roles.includes("ROLE_SUPER_ADMIN") ?
                                        filteredFacilityList.map((facility, index) =>
                                            <option key={index} value={facility.id}>{facility.name}</option>
                                            )
                                            :
                                            <option value={user?.facility.id}>{user?.facility.name}</option>
                                    }
                               
                                
                            </select>
                        </div>
                    </div>
                    <div className="row">

                        {/* <div className="col-md-3 form-group my-3">
                            <label className="form-label fw-bold">Facility:</label>
                            <Select
                                name = "facility"
                                options={filteredFacility}
                                placeholder="select facility"
                                isMulti
                                onChange={handleFacility}
                                
                            />
                        </div> */}                           
                        <div className="col-md-4 col-xs-6 form-group my-3">
                            <label className="form-label fw-bold">How Do You Want the Linelist?: </label>
                            <div className="form-check">
                                <input type="radio" name="range_type" className="form-check-input" value="byRange" id="byRange"
                                    onChange={(e) => setRangeType(e.target.value)}
                                 />
                                <label className="form-label" htmlFor="byRange"> By Date Range</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" name="range_type" className="form-check-input" value="byDate" id="byDate"
                                    onChange={(e) => setRangeType(e.target.value)}
                                 required />
                                <label className="form-label" htmlFor="byDate"> By End Date</label>
                            </div>
                        </div>
                        {
                            rangType === 'byRange' ? 
                            <div className="col-md-4 form-group my-3">
                                <label className="form-label fw-bold">Start Date:</label>
                                <input type="date" name="startDate" className="form-control" max={today}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </div>
                            :null
                        }
                        <div className="col-md-4 form-group my-3">
                            <label className="form-label fw-bold">End Date:</label>
                            <input type="date" name="endDate" className="form-control" max={today}
                                onChange={(e) => setEndDate(e.target.value)} 
                            />
                        </div>
                        
                    </div>
                    <div className="row">
                    {
                            user?.roles.includes("ROLE_ADMIN") ? 
                        
                        <>
                        <div className="col-md-2 col-xs-6 form-group my-3">
                            <label className="form-label fw-bold">Options: </label>
                            <div className="form-check">
                                <input type="checkbox" name="isDecrypt" className="form-check-input" id="isDecrypt"
                                    onChange={(e) => {e.target.checked ? setIsDecrypt(true) : setIsDecrypt(false)}}
                                 />
                                <label className="form-label fw-bold" htmlFor="isDecrypt"> Decrypt</label>
                            </div>
                        </div>
                        </>:null
                        }
                        <div className="col-md-2 col-xs-6 form-group my-3">
                            <label className="form-label fw-bold">Format: </label>
                            <div className="form-check">
                                <input type="checkbox" name="isCSV" value="isCSV" className="form-check-input" id="isCSV"
                                    onChange={(e) => {e.target.checked ? setIsCSV(true) : setIsCSV(false)}}
                                />
                                <label className="form-label fw-bold" htmlFor="isCSV"> CSV</label>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row text-center">
                        <div className="col-md-4"></div>
                        {
                            rangType === 'byRange' ? 
                            
                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-4 my-3">
                                    <button type="submit" role="button" className="btn btn-danger" onClick={getLineListByDateRange}>
                                        Download LineList By Date Range <i className="fa-solid fa-download"></i>
                                    </button>
                            </div>
                        
                            : rangType ==='byDate' ?
                                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-4 my-3">
                                    <button type="submit" role="button" className="btn btn-danger" onClick={getLinelistByEndDate}>
                                        Download Linelist By End Date <i className="fa-solid fa-download"></i>
                                    </button>
                                </div>
                            : null
                        }
                        <div className="col-md-4"></div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</>
  )
  
}

export default Reporting