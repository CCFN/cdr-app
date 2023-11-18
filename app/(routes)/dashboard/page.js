"use client"
import { useEffect, useState } from "react";
import DashboardCard from "../components/dashboardCard";
import NigerianMap from "../components/nigerianMap";
import LittleCard from "../components/littleCard";
import axios from 'axios'
import { useRouter } from "next/navigation";
//import AuthContext  from "../../../api/context/AuthContext";
import { useSession } from "next-auth/react";
//import { dataLocations } from "./hdjddh";

export default function Home() {
  const { data: session } = useSession();
 
  const user  = session?.user;
  //console.log("user: "+user)
  const [states, setStates] = useState([])
  const [lgas, setLga] = useState()
  const [facility, setFacility] = useState()
  const [data, setData] = useState({})
  const router = useRouter()

  const base_url = process.env.baseURL;

  


  const fetchData = async () =>{
    try {
      if(user?.state.stateName === "Abuja"){
        await axios.post(`${base_url}dashboard/desktop`, {state:user?.state?.stateName, facility:''})
        .then(response => {
          setData(response.data)
        })
      }
      else if(user?.state.stateName === "Enugu"){
        await axios.post(`${base_url}dashboard/desktop`, {state:user?.state?.stateName, facility:''})
        .then(response => {
          setData(response.data)
        })
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  const fetchLocations = async () =>{
    if(user?.state.stateName === 'Abuja'){
      try {
        await axios.get(`${base_url}state/`)
          .then((response) =>{
            setStates(response.data)
          })
        // axios.get(`${base_url}locations/all`)
        //   .then((response) =>{
        //     const data = response.data.filter(obj => {
  
        //     })
        //     setFacility(response.data.)
        //   })
        
      } catch (error) {
        console.log(error)
      }
    }

    }

  const urls= [
    `${base_url}state/`,
    `${base_url}locations/all`

  ]

  useEffect(() =>{
      fetchLocations();
      fetchData();
  },[user])
  return (
    <>
      <main className='container-fluid main-content'>

        <div className='row mx-3 my-3 pt-3'>
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-7 main-row'>
            <div className='row'>
              <DashboardCard 
                iconName="fa-solid fa-syringe" 
                upper_indicator="Total HIV Tested"
                upper_value={data.hts_TST}
                lower_indicator="% HIV Positive"
                lower_value={data.hts_TST_POSITIVE}
              />
              <DashboardCard 
                iconName="fa-solid fa-users" 
                upper_indicator="On Treatment"
                upper_value={data.tx_CUR}
                lower_indicator="% Interruption in Treatment"
                lower_value={data.tx_CUR_IIT}
              />
              <DashboardCard 
                iconName="fa-solid fa-person-breastfeeding"
                upper_indicator="Pregnant and Breastfeeding"
                upper_value={data.pmtct_STAT}
                lower_indicator="% HIV Positive"
                lower_value={data.pmtct_STAT_ART}
              />
              <DashboardCard 
                iconName="fa-solid fa-vial-virus"
                upper_indicator="Total Viral Load  Results Received"
                upper_value={data.tx_PVLS}
                lower_indicator="% Virally Supressed"
                lower_value={data.tx_PVLS_SUPPRESSED}
              />
              <DashboardCard 
                iconName="fa-solid fa-lungs"
                upper_indicator="Total Tested for Tuberculosis"
                upper_value={data.tb_TESTED}
                lower_indicator="% TB Clients on ART"
                lower_value={data.tx_TESTED}
              />
              <DashboardCard 
                iconName="fa-solid fa-children"
                upper_indicator="Total OVC Served"
                upper_value={data.ovc_PENDING}
                lower_indicator="% OVC on ART"
                lower_value={data.ovc_PENDING}
              />
              
            </div>
          </div>
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-5'>
              <div className="row mb-3 mt-3 little-card-row">
                <LittleCard title="STATE" value={
                  states.length > 0 ? states.length - 1 : 0} icon="fa-solid fa-map-location-dot" />
                <LittleCard title="LGAS" value={120} icon="fa-solid fa-location-dot" />
                <LittleCard title="FACILITIES" value={347} icon="fa-solid fa-hospital" />
              </div>
              <div className="row">
                <NigerianMap />
                <div className="cdr-desc alert alert-info mt-5">
                <p>
                  The Caritas Nigeria Patient-Level Central Data Repository (PL-CDR) is a
                  central database for patient-level data uploaded from all Caritas facilities.
                </p>
              </div>
              </div>
              
              
            </div>
          </div>
      </main>
    </>
  )
}