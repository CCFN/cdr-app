'use client'
import React, { useState, useContext,useEffect } from "react";
import "../monitoring-css/monitoring-style.css"
import FacilityListComponent from "../monitoring-components/facilityListComponent";
import ViralLoadCard from "../monitoring-components/vlCard";
import GraphCard from "../monitoring-components/graphCard";
import VlTable from "../monitoring-components/vlTable";
import FacilityContext from "@/app/(routes)/monitoring/context/facilityListContext";
import BarsWithMovingBullets from "../monitoring-components/barsWithMovingBulletChart";
import axios from "axios";
import DonutChart from "../monitoring-components/donutChart";
import LocationCard from "../monitoring-components/locationCard";
import { states,lga,facilities } from "../../data/facilityList";

function Recency () {

  const [stateTotal, setStateTotal] = useState(0);
  const [lgaTotal, setLgaTotal] = useState(0);
  const [facilityTotal, setFacilityTotal] = useState(0);

  
  // Variables for VL Eligibility
  const [vldata, setVlEligible] = useState(0);
  const [vldataAbia, setVlEligibleAbia] = useState(0);
  const [vldataEnugu, setVlEligibleEnugu] = useState(0);
  const [vldataImo, setVlEligibleImo] = useState(0);
  let countAbia = 0;
  let countEnugu = 0;
  let countImo = 0;

  // Variables for VL Results  
  const [vlResult, setVlResult] = useState(0);
  const [vlResultAbia, setVlResultAbia] = useState(0);
  const [vlResultEnugu, setVlResultEnugu] = useState(0);
  const [vlResultImo, setVlResultImo] = useState(0);
  let countAbiaResult = 0;
  let countEnuguResult = 0;
  let countImoResult = 0;

  // Variables for sample collection
  const [vlSampleCollection, setVlSampleCollection] = useState(0);
  const [vlSampleCollectionAbia, setVlSampleCollectionAbia] = useState(0);
  const [vlSampleCollectionEnugu, setVlSampleCollectionEnugu] = useState(0);
  const [vlSampleCollectionImo, setVlSampleCollectionImo] = useState(0);
  let countAbiaVlSampleCollection = 0;
  let countEnuguVlSampleCollection = 0;
  let countImoVlSampleCollection = 0;
 
   // Variables for VL Suppressed
   const [vlSuppressed, setVlSuppressed] = useState(0);
   const [vlSuppressedAbia, setVlSuppressedAbia] = useState(0);
   const [vlSuppressedEnugu, setVlSuppressedEnugu] = useState(0);
   const [vlSuppressedImo, setVlSuppressedImo] = useState(0);
   let countAbiaVlSuppressed = 0;
   let countEnuguVlSuppressed = 0;
   let countImoVlSuppressed = 0;
  
   // Variables for VL Suppressed
   const [vlUnSuppressed, setVlUnSuppressed] = useState(0);
   const [vlUnSuppressedAbia, setVlUnSuppressedAbia] = useState(0);
   const [vlUnSuppressedEnugu, setVlUnSuppressedEnugu] = useState(0);
   const [vlUnSuppressedImo, setVlUnSuppressedImo] = useState(0);
   let countAbiaVlUnSuppressed = 0;
   let countEnuguVlUnSuppressed = 0;
   let countImoVlUnSuppressed = 0;
  

  const {
    selectedState,
    selectedLGAs,
    selectedFacility,
    startDate,
    endDate
    
} = useContext(FacilityContext)

useEffect(() => {
  if (
  selectedState &&
  selectedLGAs &&
  selectedFacility &&
  startDate &&
  endDate
  ) {
  getVLEligibility();
  }
  }, [selectedState, selectedLGAs, selectedFacility, startDate, endDate]);
  function getVLEligibility(e){
    //e.preventDefault();
 const bURL = process.env.baseURL;
     const vlDataType = {
         states: selectedState,
         lgas: selectedLGAs,
         facilities: selectedFacility,
         dateFrom: startDate,
         dateTo: endDate,
     };

   


     try {

      //Use the Lga Array from the Filter list to filter the number of facilities based on the LGA Selected
        const filter_lgas = facilities.filter((facilities) => {
            return selectedLGAs.some((lga) =>{
                return lga === facilities.lgaid
            })
        })

        

      console.log(filter_lgas.length);
      console.log(selectedState);
      console.log(selectedLGAs);
      console.log(selectedFacility);

      if(selectedState.length == 0 ){
        setStateTotal(3);
      };
      if(selectedLGAs.length == 0){
        setLgaTotal(53);
      };
      if(filter_lgas.length == 0){
        setFacilityTotal(111)
      };
      if(selectedState.length > 0 ){
        setStateTotal(selectedState.length);
      };
      if(selectedLGAs.length > 0){
        setLgaTotal(selectedLGAs.length);
      };
      if(filter_lgas.length > 0 && selectedFacility == 0){
        setFacilityTotal(filter_lgas.length)
      }else if(filter_lgas.length > 0 && selectedFacility > 0){
        setFacilityTotal(selectedFacility.length)
      } 
 
                //Endpoint for Vl Eligibility
                 axios.post(bURL + "vlchart/eligibility", vlDataType).then((response)=>{
                 
                     //console.log(response.data);
                     setVlEligible(response.data.sumTotal);
                     //console.log(response.data.charts);
                     const vlChart = response.data.charts;
                     const vResultAbia = vlChart.filter((data) => data.state === 'Abia').map(data => {countAbia = countAbia + data.total_aggregate;})
                     const vlResultEnugu = vlChart.filter((data1) => data1.state === 'Enugu').map(data1 => {countEnugu = countEnugu + data1.total_aggregate;})
                     const vlResultImo = vlChart.filter((data2) => data2.state === 'Imo').map(data2 => {countImo = countImo + data2.total_aggregate;})
                   // console.log(vlEligibleState);
                    //console.log(countAbia);
                    //console.log(countEnugu);
                    //console.log(countImo);
                    //console.log(vlEligibleImo);
                    setVlEligibleAbia(countAbia);
                    setVlEligibleEnugu(countEnugu);
                    setVlEligibleImo(countImo);
                     
                 });

                 //EndPoint for VlResults

                 axios.post(bURL + "vlchart/results", vlDataType).then((response)=>{
              
                 // console.log(response.data);
                  setVlResult(response.data.sumTotal);
                  //console.log(response.data.charts);
                  const vlChart = response.data.charts;
                  const vlResultAbia = vlChart.filter((data) => data.state === 'Abia').map(data => {countAbiaResult = countAbiaResult + data.total_aggregate;})
                  const vlResultEnugu = vlChart.filter((data1) => data1.state === 'Enugu').map(data1 => {countEnuguResult = countEnuguResult + data1.total_aggregate;})
                  const vlResultImo = vlChart.filter((data2) => data2.state === 'Imo').map(data2 => {countImoResult = countImoResult + data2.total_aggregate;})
                // console.log(vlEligibleState);
                 //console.log(countAbiaResult);
                 //console.log(countEnuguResult);
                 //console.log(countImoResult);
                 //console.log(vlEligibleImo);
                 setVlResultAbia(countAbiaResult);
                 setVlResultEnugu(countEnuguResult);
                 setVlResultImo(countImoResult);
                  
              });

               //EndPoint for VL Sample collection
               axios.post(bURL + "vlchart/sample_collection", vlDataType).then((response)=>{
            
                //console.log(response.data);
                setVlSampleCollection(response.data.sumTotal);
                //console.log(response.data.charts);
                const vlChart = response.data.charts;
                vlChart.filter((data) => data.state === 'Abia').map(data => {countAbiaVlSampleCollection = countAbiaVlSampleCollection + data.total_aggregate;})
                vlChart.filter((data1) => data1.state === 'Enugu').map(data1 => {countEnuguVlSampleCollection = countEnuguVlSampleCollection + data1.total_aggregate;})
                vlChart.filter((data2) => data2.state === 'Imo').map(data2 => {countImoVlSampleCollection = countImoVlSampleCollection + data2.total_aggregate;})
             //Set the count values for each state
               setVlSampleCollectionAbia(countAbiaVlSampleCollection);
               setVlSampleCollectionEnugu(countEnuguVlSampleCollection);
               setVlSampleCollectionImo(countImoVlSampleCollection);
                
            });

             //EndPoint for VL Suppressed
             axios.post(bURL + "vlchart/suppressed", vlDataType).then((response)=>{
          
              //console.log(response.data);
              setVlSuppressed(response.data.sumTotal);
              //console.log(response.data.charts);
              const vlChart = response.data.charts;
              vlChart.filter((data) => data.state === 'Abia').map(data => {countAbiaVlSuppressed = countAbiaVlSuppressed + data.total_aggregate;})
              vlChart.filter((data1) => data1.state === 'Enugu').map(data1 => {countEnuguVlSuppressed = countEnuguVlSuppressed + data1.total_aggregate;})
              vlChart.filter((data2) => data2.state === 'Imo').map(data2 => {countImoVlSuppressed = countImoVlSuppressed + data2.total_aggregate;})
           //Set the count values for each state
             setVlSuppressedAbia(countAbiaVlSuppressed);
             setVlSuppressedEnugu(countEnuguVlSuppressed);
             setVlSuppressedImo(countImoVlSuppressed);
              
          });

             //EndPoint for VL UnSuppressed
             axios.post(bURL + "vlchart/unsuppressed", vlDataType).then((response)=>{
          
              //console.log(response.data);
              setVlUnSuppressed(response.data.sumTotal);
              //console.log(response.data.charts);
              const vlChart = response.data.charts;
              vlChart.filter((data) => data.state === 'Abia').map(data => {countAbiaVlUnSuppressed = countAbiaVlUnSuppressed + data.total_aggregate;})
              vlChart.filter((data1) => data1.state === 'Enugu').map(data1 => {countEnuguVlUnSuppressed = countEnuguVlUnSuppressed + data1.total_aggregate;})
              vlChart.filter((data2) => data2.state === 'Imo').map(data2 => {countImoVlUnSuppressed = countImoVlUnSuppressed + data2.total_aggregate;})
           //Set the count values for each state
             setVlUnSuppressedAbia(countAbiaVlUnSuppressed);
             setVlUnSuppressedEnugu(countEnuguVlUnSuppressed);
             setVlUnSuppressedImo(countImoVlUnSuppressed);
              
          });



             } catch (error) {
                 console.log(error);
             }
 
 }
 
return (
  <div className="container mt-3">
    <div className="row">
      <div className="col-md-12 text-center p-3"><h3>Recency</h3></div>
    </div>
    {/* LineBar View */}
    <div className="row">
      <div className="col-md-3 linelist-bar">
        <FacilityListComponent handleFunction={getVLEligibility} />
        
       
      </div>
       {/* Monitoring Row View */}
      <div className="col-md-9">
        {/* Location cards */}

        <div className="row monitoring-row">
        <LocationCard 
          upper_indicator="STATE" 
          upper_value = {stateTotal}
           />

<LocationCard 
          upper_indicator="LGA" 
          upper_value = {lgaTotal}
           />

<LocationCard 
          upper_indicator="FACILITY" 
          upper_value = {facilityTotal}
           />
        


        
        </div>
        {/* Indicator cards */}
        <div className="row monitoring-row">
        <ViralLoadCard 
          upper_indicator="Tx_Curr" 
          upper_value = "60,011"
           />
        <ViralLoadCard  upper_indicator="Eligible" 
          upper_value = {vldata}
           />
           <ViralLoadCard  upper_indicator="Samples" 
          upper_value = {vlSampleCollection}
           />
           <ViralLoadCard  upper_indicator="Results" 
          upper_value = {vlResult}
           />
           <ViralLoadCard  upper_indicator="Suppressed" 
          upper_value = {vlSuppressed}
           />
           <ViralLoadCard  upper_indicator="UnSuppressed" 
          upper_value = {vlUnSuppressed}
           />
        


        
        </div>
         {/* Graph View */}

        {/* <div className="row">
          <GraphCard indicator = "VL CASCADE " description="KEY METRICS OVERVIEW" chartType={<BarsWithMovingBullets eligible={vldata} results={vlResult} samples={vlSampleCollection} suppressed={vlSuppressed} unsuppressed={vlUnSuppressed} chartTypeNumber={10}/>} />
          
        </div> */}

        <div className="row">
          <GraphCard indicator = "VL RESULT CLASSIFICATION " description="" unsuppressed = {vlUnSuppressed} chartType={<DonutChart chartTypeNumber={11}/>} />
          
        </div>
       

        <div className="row">
        <div className="">
        <VlTable eligibleAbia={vldataAbia} eligibleEnugu={vldataEnugu} eligibleImo={vldataImo} resultAbia={vlResultAbia} resultEnugu={vlResultEnugu} resultImo={vlResultImo} sampleAbia={vlSampleCollectionAbia} sampleEnugu={vlSampleCollectionEnugu} sampleImo={vlSampleCollectionImo} suppressedAbia={vlSuppressedAbia} suppressedEnugu={vlSuppressedEnugu} suppressedImo={vlSuppressedImo} unSuppressedAbia={vlUnSuppressedAbia} unSuppressedEnugu={vlUnSuppressedEnugu} unSuppressedImo={vlUnSuppressedImo}/>
        </div>
         </div>

        {/* <div className="row">
        <div className="col-md-9">
          <div className="row">
          <PieCard></PieCard>
          <PieCard></PieCard>

          </div>
          
        </div>


        </div> */}

        
        {/* <div className="row">
          <GraphCard indicator = "HTS_TST " description="BY SEX AND POPULATION" m65={-4.2} f65={3.0} m55={-5.7} f55={5.0} m50={-7.6} f50={5.0} m45={-8.4} f45={8.0} m40={-10.1} f40={9.0} m35={-14.6} f35={16.0} m30={-13.3} f30={16.0} m25={-10.5} f25={12} m20={-8.4} f20={8.0} m15={-7.2} f15={6.0} m10={-5.3} f10={6.0} m5={-3.2} f5={3.0} m0={-2.5} f0={2.0}/>
          
        </div>

        <div className="row">
        <GraphCard indicator = "HTS_POS " description="BY SEX AND POPULATION" m65={-3.2} f65={2.0} m55={-4.7} f55={4.0} m50={-6.6} f50={4.0} m45={-7.4} f45={7.0} m40={-9.1} f40={8.0} m35={-13.6} f35={15.0} m30={-12.3} f30={15.0} m25={-9.5} f25={11.0} m20={-7.4} f20={7.0} m15={-6.2} f15={5.0} m10={-4.3} f10={5.0} m5={-2.2} f5={2.0} m0={-1.5} f0={1.0}/>

          
        </div> */}

     
    </div>
    </div>
   
  </div>
)



};


export default Recency;