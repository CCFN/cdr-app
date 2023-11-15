'use client'
import React, { useState, useEffect,useContext } from "react";
import ReactDOM from "react-dom";
import { Link } from "next/link";
import FacilityListComponent from "../monitoring-components/facilityListComponent";
import MonitoringCard from "../monitoring-components/monitoringCard";
import YieldCard from "../monitoring-components/yieldCard";
import GraphCard from "../monitoring-components/graphCard";
import StackedBarChart from "../monitoring-components/stackedBarCharts";
import SortedBarChart from "../monitoring-components/sortedBarChart";
import PopulationPyramidChart from "../monitoring-components/populationPyramidChart";
import FacilityContext from "../context/facilityListContext";
import axios from "axios";
import { states,lga,facilities } from "../../data/facilityList";
import YieldGuage from "../monitoring-components/yieldGuage";


function Hts () {
  const [yieldTotal, setYieldTotal] = useState(0);
  // let countYieldTotal = htsTstPosData/htsTstData*100;
  // let rouundedCoutYield = countYieldTotal.toFixed(0);

  const [stateTotal, setStateTotal] = useState(0);
  const [lgaTotal, setLgaTotal] = useState(0);
  const [facilityTotal, setFacilityTotal] = useState(0);

  
  // Variables for VL Eligibility
  const [htsTstData, setHtsTstData] = useState(0);
  const [htsTstDataAbia, setHtsTstDataAbia] = useState(0);
  const [htsTstDataEnugu, setHtsTstDataEnugu] = useState(0);
  const [htsTstDataImo, setHtsTstDataImo] = useState(0);
  let countAbiaHTS = 0;
  let countEnuguHTS = 0;
  let countImoHTS = 0;

    // Variables for VL Eligibility
    const [htsTstPosData, setHtsTstPosData] = useState(0);
    const [htsTstPosDataAbia, setHtsTstPosDataAbia] = useState(0);
    const [htsTstPosDataEnugu, setHtsTstPosDataEnugu] = useState(0);
    const [htsTstPosDataImo, setHtsTstPosDataImo] = useState(0);
    let countAbiaHTSPos = 0;
    let countEnuguHTSPos = 0;
    let countImoHTSPos = 0;

    //variables for disaggregation HTS_TST(Male)
    let countHTSm0 = 0;
    let countHTSm5 = 0;
    let countHTSm10 = 0;
    let countHTSm15 = 0;
    let countHTSm20 = 0;
    let countHTSm25 = 0;
    let countHTSm30 = 0;
    let countHTSm35 = 0;
    let countHTSm40 = 0;
    let countHTSm45 = 0;
    let countHTSm50 = 0;
    let countHTSm55 = 0;
    let countHTSm65 = 0;
  const [htsTstDatam0, setHtsTstDatam0] = useState(0);
  const [htsTstDatam5, setHtsTstDatam5] = useState(0);
  const [htsTstDatam10, setHtsTstDatam10] = useState(0);
  const [htsTstDatam15, setHtsTstDatam15] = useState(0);
  const [htsTstDatam20, setHtsTstDatam20] = useState(0);
  const [htsTstDatam25, setHtsTstDatam25] = useState(0);
  const [htsTstDatam30, setHtsTstDatam30] = useState(0);
  const [htsTstDatam35, setHtsTstDatam35] = useState(0);
  const [htsTstDatam40, setHtsTstDatam40] = useState(0);
  const [htsTstDatam45, setHtsTstDatam45] = useState(0);
  const [htsTstDatam50, setHtsTstDatam50] = useState(0);
  const [htsTstDatam55, setHtsTstDatam55] = useState(0);
  const [htsTstDatam65, setHtsTstDatam65] = useState(0);


    //variables for disaggregation HTS_TST(Female)
    let countHTSf0 = 0;
    let countHTSf5 = 0;
    let countHTSf10 = 0;
    let countHTSf15 = 0;
    let countHTSf20 = 0;
    let countHTSf25 = 0;
    let countHTSf30 = 0;
    let countHTSf35 = 0;
    let countHTSf40 = 0;
    let countHTSf45 = 0;
    let countHTSf50 = 0;
    let countHTSf55 = 0;
    let countHTSf65 = 0;
  const [htsTstDataf0, setHtsTstDataf0] = useState(0);
  const [htsTstDataf5, setHtsTstDataf5] = useState(0);
  const [htsTstDataf10, setHtsTstDataf10] = useState(0);
  const [htsTstDataf15, setHtsTstDataf15] = useState(0);
  const [htsTstDataf20, setHtsTstDataf20] = useState(0);
  const [htsTstDataf25, setHtsTstDataf25] = useState(0);
  const [htsTstDataf30, setHtsTstDataf30] = useState(0);
  const [htsTstDataf35, setHtsTstDataf35] = useState(0);
  const [htsTstDataf40, setHtsTstDataf40] = useState(0);
  const [htsTstDataf45, setHtsTstDataf45] = useState(0);
  const [htsTstDataf50, setHtsTstDataf50] = useState(0);
  const [htsTstDataf55, setHtsTstDataf55] = useState(0);
  const [htsTstDataf65, setHtsTstDataf65] = useState(0);

  //variables for disaggregation HTS_TST_POS(Male)
  let countHTSPOSm0 = 0;
  let countHTSPOSm5 = 0;
  let countHTSPOSm10 = 0;
  let countHTSPOSm15 = 0;
  let countHTSPOSm20 = 0;
  let countHTSPOSm25 = 0;
  let countHTSPOSm30 = 0;
  let countHTSPOSm35 = 0;
  let countHTSPOSm40 = 0;
  let countHTSPOSm45 = 0;
  let countHTSPOSm50 = 0;
  let countHTSPOSm55 = 0;
  let countHTSPOSm65 = 0;
const [htsTstPosDatam0, setHtsTstPosDatam0] = useState(0);
const [htsTstPosDatam5, setHtsTstPosDatam5] = useState(0);
const [htsTstPosDatam10, setHtsTstPosDatam10] = useState(0);
const [htsTstPosDatam15, setHtsTstPosDatam15] = useState(0);
const [htsTstPosDatam20, setHtsTstPosDatam20] = useState(0);
const [htsTstPosDatam25, setHtsTstPosDatam25] = useState(0);
const [htsTstPosDatam30, setHtsTstPosDatam30] = useState(0);
const [htsTstPosDatam35, setHtsTstPosDatam35] = useState(0);
const [htsTstPosDatam40, setHtsTstPosDatam40] = useState(0);
const [htsTstPosDatam45, setHtsTstPosDatam45] = useState(0);
const [htsTstPosDatam50, setHtsTstPosDatam50] = useState(0);
const [htsTstPosDatam55, setHtsTstPosDatam55] = useState(0);
const [htsTstPosDatam65, setHtsTstPosDatam65] = useState(0);

  //variables for disaggregation HTS_TST_POS(Male)
  let countHTSPOSf0 = 0;
  let countHTSPOSf5 = 0;
  let countHTSPOSf10 = 0;
  let countHTSPOSf15 = 0;
  let countHTSPOSf20 = 0;
  let countHTSPOSf25 = 0;
  let countHTSPOSf30 = 0;
  let countHTSPOSf35 = 0;
  let countHTSPOSf40 = 0;
  let countHTSPOSf45 = 0;
  let countHTSPOSf50 = 0;
  let countHTSPOSf55 = 0;
  let countHTSPOSf65 = 0;
const [htsTstPosDataf0, setHtsTstPosDataf0] = useState(0);
const [htsTstPosDataf5, setHtsTstPosDataf5] = useState(0);
const [htsTstPosDataf10, setHtsTstPosDataf10] = useState(0);
const [htsTstPosDataf15, setHtsTstPosDataf15] = useState(0);
const [htsTstPosDataf20, setHtsTstPosDataf20] = useState(0);
const [htsTstPosDataf25, setHtsTstPosDataf25] = useState(0);
const [htsTstPosDataf30, setHtsTstPosDataf30] = useState(0);
const [htsTstPosDataf35, setHtsTstPosDataf35] = useState(0);
const [htsTstPosDataf40, setHtsTstPosDataf40] = useState(0);
const [htsTstPosDataf45, setHtsTstPosDataf45] = useState(0);
const [htsTstPosDataf50, setHtsTstPosDataf50] = useState(0);
const [htsTstPosDataf55, setHtsTstPosDataf55] = useState(0);
const [htsTstPosDataf65, setHtsTstPosDataf65] = useState(0);


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
  getHts();
  }
  }, [selectedState, selectedLGAs, selectedFacility, startDate, endDate]);
  function getHts(e){
    //e.preventDefault();
 const bURL = process.env.baseURL;
     const htsDataType = {
         state: selectedState,
         lga: selectedLGAs,
         facility: selectedFacility,
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

        

      // console.log(filter_lgas.length);
      // console.log(selectedState);
      // console.log(selectedLGAs);
      // console.log(selectedFacility);

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
 
                //Endpoint for HTS TST Data
                 axios.post(bURL + "htscharts/tst", htsDataType).then((response)=>{
                 
                     console.log(response.data);
                     
                     //console.log(response.data.charts);
                     const vlChart = response.data;
                     vlChart.filter((data) => data.state === 'Abia').map(data => {countAbiaHTS = countAbiaHTS + data.total_aggregate;})
                    vlChart.filter((data1) => data1.state === 'Enugu').map(data1 => {countEnuguHTS = countEnuguHTS + data1.total_aggregate;})
                    vlChart.filter((data2) => data2.state === 'Imo').map(data2 => {countImoHTS = countImoHTS + data2.total_aggregate;})
                    setHtsTstData(countAbiaHTS+countEnuguHTS+countImoHTS);
                    // console.log(vlEligibleState);
                    //console.log(countAbia);
                    //console.log(countEnugu);
                    //console.log(countImo);
                    //console.log(vlEligibleImo);
                    setHtsTstDataAbia(countAbiaHTS);
                    setHtsTstDataEnugu(countEnuguHTS);
                    setHtsTstDataImo(countImoHTS);

                    //Disaggregation Data HTS_TST(Male)
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSm0 = countHTSm0 + data2.less_than_one;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSm5 = countHTSm5 + data2.from_5_9;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSm10 = countHTSm10 + data2.from_10_14;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSm15 = countHTSm15 + data2.from_15_19;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSm20 = countHTSm20 + data2.from_20_24;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSm25 = countHTSm25 + data2.from_25_29;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSm30 = countHTSm30 + data2.from_30_34;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSm35 = countHTSm35 + data2.from_35_39;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSm40 = countHTSm40 + data2.from_40_44;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSm45 = countHTSm45 + data2.from_45_49;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSm50 = countHTSm50 + data2.from_50_54;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSm55 = countHTSm55 + data2.from_55_59;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSm65 = countHTSm65 + data2.from_25_29;})
                 setHtsTstDatam0(countHTSm0);
                 setHtsTstDatam5(countHTSm5);
                 setHtsTstDatam10(countHTSm10);
                 setHtsTstDatam15(countHTSm15);
                 setHtsTstDatam20(countHTSm20);
                 setHtsTstDatam25(countHTSm25);
                 setHtsTstDatam30(countHTSm30);
                 setHtsTstDatam35(countHTSm35);
                 setHtsTstDatam40(countHTSm40);
                 setHtsTstDatam45(countHTSm45);
                 setHtsTstDatam50(countHTSm50);
                 setHtsTstDatam55(countHTSm55);
                 setHtsTstDatam65(countHTSm65);
                 
                 //Disaggregation Data HTS_TST(Female)
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSf0 = countHTSf0 + data2.less_than_one;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSf5 = countHTSf5 + data2.from_5_9;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSf10 = countHTSf10 + data2.from_10_14;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSf15 = countHTSf15 + data2.from_15_19;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSf20 = countHTSf20 + data2.from_20_24;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSf25 = countHTSf25 + data2.from_25_29;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSf30 = countHTSf30 + data2.from_30_34;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSf35 = countHTSf35 + data2.from_35_39;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSf40 = countHTSf40 + data2.from_40_44;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSf45 = countHTSf45 + data2.from_45_49;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSf50 = countHTSf50 + data2.from_50_54;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSf55 = countHTSf55 + data2.from_55_59;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSf65 = countHTSf65 + data2.from_25_29;})
                 setHtsTstDataf0(countHTSf0);
                 setHtsTstDataf5(countHTSf5);
                 setHtsTstDataf10(countHTSf10);
                 setHtsTstDataf15(countHTSf15);
                 setHtsTstDataf20(countHTSf20);
                 setHtsTstDataf25(countHTSf25);
                 setHtsTstDataf30(countHTSf30);
                 setHtsTstDataf35(countHTSf35);
                 setHtsTstDataf40(countHTSf40);
                 setHtsTstDataf45(countHTSf45);
                 setHtsTstDataf50(countHTSf50);
                 setHtsTstDataf55(countHTSf55);
                 setHtsTstDataf65(countHTSf65);
                 
                     
                 });

                 //Endpoint for HTS POS Data
                 axios.post(bURL + "htscharts/pos", htsDataType)
                 .then((response)=>{
              
                 const vlChart = response.data;
                // console.log(vlChart)
                 vlChart.filter((data) => data.state === 'Abia').map(data => {countAbiaHTSPos = countAbiaHTSPos + data.total_aggregate;})
                 vlChart.filter((data1) => data1.state === 'Enugu').map(data1 => {countEnuguHTSPos = countEnuguHTSPos + data1.total_aggregate;})
                 vlChart.filter((data2) => data2.state === 'Imo').map(data2 => {countImoHTSPos = countImoHTSPos + data2.total_aggregate;})
                 setHtsTstPosData(countAbiaHTSPos+countEnuguHTSPos+countImoHTSPos);
                 setHtsTstPosDataAbia(countAbiaHTSPos);
                 setHtsTstPosDataAbia(countAbiaHTSPos);
                 setHtsTstPosDataEnugu(countEnuguHTSPos);
                 setHtsTstPosDataImo(countImoHTSPos);

                 
                 //Disaggregation Data HTS_TST_POS(Male)
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSPOSm0 = countHTSPOSm0 + data2.less_than_one;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSPOSm5 = countHTSPOSm5 + data2.from_5_9;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSPOSm10 = countHTSPOSm10 + data2.from_10_14;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSPOSm15 = countHTSPOSm15 + data2.from_15_19;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSPOSm20 = countHTSPOSm20 + data2.from_20_24;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSPOSm25 = countHTSPOSm25 + data2.from_25_29;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSPOSm30 = countHTSPOSm30 + data2.from_30_34;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSPOSm35 = countHTSPOSm35 + data2.from_35_39;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSPOSm40 = countHTSPOSm40 + data2.from_40_44;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSPOSm45 = countHTSPOSm45 + data2.from_45_49;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSPOSm50 = countHTSPOSm50 + data2.from_50_54;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSPOSm55 = countHTSPOSm55 + data2.from_55_59;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSPOSm65 = countHTSPOSm65 + data2.from_25_29;})
                 setHtsTstPosDatam0(countHTSPOSm0);
                 setHtsTstPosDatam5(countHTSPOSm5);
                 setHtsTstPosDatam10(countHTSPOSm10);
                 setHtsTstPosDatam15(countHTSPOSm15);
                 setHtsTstPosDatam20(countHTSPOSm20);
                 setHtsTstPosDatam25(countHTSPOSm25);
                 setHtsTstPosDatam30(countHTSPOSm30);
                 setHtsTstPosDatam35(countHTSPOSm35);
                 setHtsTstPosDatam40(countHTSPOSm40);
                 setHtsTstPosDatam45(countHTSPOSm45);
                 setHtsTstPosDatam50(countHTSPOSm50);
                 setHtsTstPosDatam55(countHTSPOSm55);
                 setHtsTstPosDatam65(countHTSPOSm65);

                 //Disaggregation Data HTS_TST_POS(Female)
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSPOSf0 = countHTSPOSf0 + data2.less_than_one;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSPOSf5 = countHTSPOSf5 + data2.from_5_9;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSPOSf10 = countHTSPOSf10 + data2.from_10_14;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSPOSf15 = countHTSPOSf15 + data2.from_15_19;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSPOSf20 = countHTSPOSf20 + data2.from_20_24;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSPOSf25 = countHTSPOSf25 + data2.from_25_29;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSPOSf30 = countHTSPOSf30 + data2.from_30_34;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSPOSf35 = countHTSPOSf35 + data2.from_35_39;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSPOSf40 = countHTSPOSf40 + data2.from_40_44;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSPOSf45 = countHTSPOSf45 + data2.from_45_49;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSPOSf50 = countHTSPOSf50 + data2.from_50_54;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSPOSf55 = countHTSPOSf55 + data2.from_55_59;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSPOSf65 = countHTSPOSf65 + data2.from_25_29;})
                 setHtsTstPosDataf0(countHTSPOSf0);
                 setHtsTstPosDataf5(countHTSPOSf5);
                 setHtsTstPosDataf10(countHTSPOSf10);
                 setHtsTstPosDataf15(countHTSPOSf15);
                 setHtsTstPosDataf20(countHTSPOSf20);
                 setHtsTstPosDataf25(countHTSPOSf25);
                 setHtsTstPosDataf30(countHTSPOSf30);
                 setHtsTstPosDataf35(countHTSPOSf35);
                 setHtsTstPosDataf40(countHTSPOSf40);
                 setHtsTstPosDataf45(countHTSPOSf45);
                 setHtsTstPosDataf50(countHTSPOSf50);
                 setHtsTstPosDataf55(countHTSPOSf55);
                 setHtsTstPosDataf65(countHTSPOSf65);
                 
                 
                 
                 
                 
                 
                  
              });

                

              let yieldTotal = htsTstPosData /htsTstData*100;
              //console.log(yieldTotal)
              let roundedYieldTotal = yieldTotal.toFixed();
              setYieldTotal(roundedYieldTotal);

              

                

             } catch (error) {
                 console.log(error);
             }
 
 }
  
return (
  <div className="container mt-3">
    <div className="row">
      <div className="col-md-12 text-center p-3"><h3>HIV Testing Services</h3></div>
    </div>
    {/* LineBar View */}
    <div className="row">
      <div className="col-md-3 linelist-bar">
      <FacilityListComponent handleFunction={getHts} />
        
       
      </div>
       {/* Monitoring Row View */}
      <div className="col-md-9">
        <div className="row monitoring-row">
        <MonitoringCard 
          upper_indicator="HTS_TST" 
          upper_value = {htsTstData}
          iconType="fa-solid fa-syringe" 
           />
        <MonitoringCard  upper_indicator="HTS_POS" 
          upper_value = {htsTstPosData}
          iconType="fa-solid fa-user-plus" 
           />

           <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 d-flex justify-content-center align-items-center monitoring-card px-3 py-0">
           <YieldGuage
          upper_indicator="YIELD"
          percentage_achieved={yieldTotal}
         
          />

           </div>
        

          

        
        </div>
         {/* Graph View */}

        <div className="row">
          <GraphCard indicator = "HTS_TST " description="BY SEX AND POPULATION" chartType={<StackedBarChart m65={-htsTstDatam65} f65={htsTstDataf65} m55={-htsTstDatam55} f55={htsTstDataf55} m50={-htsTstDatam50} f50={htsTstDataf50} m45={-htsTstDatam45} f45={htsTstDataf45} m40={-htsTstDatam40} f40={htsTstDataf40} m35={-htsTstDatam35} f35={htsTstDataf35} m30={-htsTstDatam30} f30={htsTstDataf30} m25={-htsTstDatam25} f25={htsTstDataf25} m20={-htsTstDatam20} f20={htsTstDataf20} m15={-htsTstDatam15} f15={htsTstDataf15} m10={-htsTstDatam10} f10={htsTstDataf10} m5={-htsTstDatam5} f5={htsTstDataf5} m0={-htsTstDatam0} f0={htsTstDataf0} chartTypeNumber={2}/>}/>
          
        </div>

        <div className="row">
        <GraphCard indicator = "HTS_TST_POS " description="BY SEX AND POPULATION" chartType={<PopulationPyramidChart m65={htsTstPosDatam65} f65={htsTstPosDataf65} m55={htsTstPosDatam55} f55={htsTstPosDataf55} m50={htsTstPosDatam50} f50={htsTstPosDataf50} m45={htsTstPosDatam45} f45={htsTstPosDataf45} m40={htsTstPosDatam40} f40={htsTstPosDataf40} m35={htsTstPosDatam35} f35={htsTstPosDataf35} m30={htsTstPosDatam30} f30={htsTstPosDataf30} m25={htsTstPosDatam25} f25={htsTstPosDataf25} m20={htsTstPosDatam20} f20={htsTstPosDataf20} m15={htsTstPosDatam15} f15={htsTstPosDataf15} m10={htsTstPosDatam10} f10={htsTstPosDataf10} m5={htsTstPosDatam5} f5={htsTstPosDataf5} m0={htsTstPosDatam0} f0={htsTstPosDataf0} chartTypeNumber={1}/>}/>

          
        </div>
        <div className="row">
        <GraphCard indicator = "HTS_STREAM(POS) " description="BY TESTING STREAMS" chartType={<SortedBarChart pip={20.0} sti={30.0} mal={35.0} indCom={50.0} indFac={60.0} inPat={40} tb={50} anc={45} opd={70} chartTypeNumber={4}/>}/>

          
        </div>

        <div className="row">
          {/* <div >
          <GraphCard indicator = "RECENCY CLASSIFICATION " chartType={<TwoLevelPieChart chartTypeNumber={5}/>}/>

          </div> */}
        

          
        </div>



     
    </div>
    </div>
   
  </div>
)



};


export default Hts;
