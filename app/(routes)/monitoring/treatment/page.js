'use client'
import React, { useState, useEffect,useContext } from "react";
import FacilityListComponent from "../monitoring-components/facilityListComponent";
import MonitoringCard from "../monitoring-components/monitoringCard";
import YieldCard from "../monitoring-components/yieldCard";
import GraphCard from "../monitoring-components/graphCard";
import StackedBarChart from "../monitoring-components/stackedBarCharts";
import GroupedAndSortedColumnsChart from "../monitoring-components/groupedAndSortedColumnsChart";
import TreatmentCard from "../monitoring-components/treatmentCard";
import CombinedBulletLineGraph from "../monitoring-components/combinedBulletLineGraph";
import { states,lga,facilities } from "../../data/facilityList";
import FacilityContext from "@/app/(routes)/monitoring/context/facilityListContext";
import axios from "axios";
import LinkageChart from "../monitoring-components/linkageChart";

function Treatment () {
  const [yieldTotal, setYieldTotal] = useState(0);
  // let countYieldTotal = txCurrData/txNewData*100;
  // let rouundedCoutYield = countYieldTotal.toFixed(0);

  const [stateTotal, setStateTotal] = useState(0);
  const [lgaTotal, setLgaTotal] = useState(0);
  const [facilityTotal, setFacilityTotal] = useState(0);

  
  // Variables for VL Eligibility
  const [txNewData, setTxNewData] = useState(0);
  const [txNewDataAbia, setTxNewDataAbia] = useState(0);
  const [txNewDataEnugu, setTxNewDataEnugu] = useState(0);
  const [txNewDataImo, setTxNewDataImo] = useState(0);
  let countAbiaTxNew = 0;
  let countEnuguTxNew = 0;
  let countImoTxNew = 0;

    // Variables for VL Eligibility
    const [txCurrData, setTxCurrData] = useState(0);
    const [txCurrDataAbia, setTxCurrDataAbia] = useState(0);
    const [txCurrDataEnugu, setTxCurrDataEnugu] = useState(0);
    const [txCurrDataImo, setTxCurrDataImo] = useState(0);
    let countAbiaTxCurr = 0;
    let countEnuguTxCurr = 0;
    let countImoTxCurr = 0;

    //variables for disaggregation HTS_TST(Male)
    let countTxNewm0 = 0;
    let countTxNewm5 = 0;
    let countTxNewm10 = 0;
    let countTxNewm15 = 0;
    let countTxNewm20 = 0;
    let countTxNewm25 = 0;
    let countTxNewm30 = 0;
    let countTxNewm35 = 0;
    let countTxNewm40 = 0;
    let countTxNewm45 = 0;
    let countTxNewm50 = 0;
    let countTxNewm55 = 0;
    let countTxNewm60 = 0;
    let countTxNewm65 = 0;
  const [txNewDatam0, setTxNewDatam0] = useState(0);
  const [txNewDatam5, setTxNewDatam5] = useState(0);
  const [txNewDatam10, setTxNewDatam10] = useState(0);
  const [txNewDatam15, setTxNewDatam15] = useState(0);
  const [txNewDatam20, setTxNewDatam20] = useState(0);
  const [txNewDatam25, setTxNewDatam25] = useState(0);
  const [txNewDatam30, setTxNewDatam30] = useState(0);
  const [txNewDatam35, setTxNewDatam35] = useState(0);
  const [txNewDatam40, setTxNewDatam40] = useState(0);
  const [txNewDatam45, setTxNewDatam45] = useState(0);
  const [txNewDatam50, setTxNewDatam50] = useState(0);
  const [txNewDatam55, setTxNewDatam55] = useState(0);
  const [txNewDatam60, setTxNewDatam60] = useState(0);
  const [txNewDatam65, setTxNewDatam65] = useState(0);


    //variables for disaggregation HTS_TST(Female)
    let countTxNewf0 = 0;
    let countTxNewf5 = 0;
    let countTxNewf10 = 0;
    let countTxNewf15 = 0;
    let countTxNewf20 = 0;
    let countTxNewf25 = 0;
    let countTxNewf30 = 0;
    let countTxNewf35 = 0;
    let countTxNewf40 = 0;
    let countTxNewf45 = 0;
    let countTxNewf50 = 0;
    let countTxNewf55 = 0;
    let countTxNewf60 = 0;
    let countTxNewf65 = 0;
  const [txNewDataf0, setTxNewDataf0] = useState(0);
  const [txNewDataf5, setTxNewDataf5] = useState(0);
  const [txNewDataf10, setTxNewDataf10] = useState(0);
  const [txNewDataf15, setTxNewDataf15] = useState(0);
  const [txNewDataf20, setTxNewDataf20] = useState(0);
  const [txNewDataf25, setTxNewDataf25] = useState(0);
  const [txNewDataf30, setTxNewDataf30] = useState(0);
  const [txNewDataf35, setTxNewDataf35] = useState(0);
  const [txNewDataf40, setTxNewDataf40] = useState(0);
  const [txNewDataf45, setTxNewDataf45] = useState(0);
  const [txNewDataf50, setTxNewDataf50] = useState(0);
  const [txNewDataf55, setTxNewDataf55] = useState(0);
  const [txNewDataf60, setTxNewDataf60] = useState(0);
  const [txNewDataf65, setTxNewDataf65] = useState(0);

  // //variables for disaggregation Tx_Curr(Male)
  // let countTxCurrm0 = 0;
  // let countTxCurrm5 = 0;
  // let countTxCurrm10 = 0;
  // let countTxCurrm15 = 0;
  // let countTxCurrm20 = 0;
  // let countTxCurrm25 = 0;
  // let countTxCurrm30 = 0;
  // let countTxCurrm35 = 0;
  // let countTxCurrm40 = 0;
  // let countTxCurrm45 = 0;
  // let countTxCurrm50 = 0;
  // let countTxCurrm55 = 0;
  // let countTxCurrm65 = 0;
const [txCurrDatam0, setTxCurrDatam0] = useState(0);
const [txCurrDatam5, setTxCurrDatam5] = useState(0);
const [txCurrDatam10, setTxCurrDatam10] = useState(0);
const [txCurrDatam15, setTxCurrDatam15] = useState(0);
const [txCurrDatam20, setTxCurrDatam20] = useState(0);
const [txCurrDatam25, setTxCurrDatam25] = useState(0);
const [txCurrDatam30, setTxCurrDatam30] = useState(0);
const [txCurrDatam35, setTxCurrDatam35] = useState(0);
const [txCurrDatam40, setTxCurrDatam40] = useState(0);
const [txCurrDatam45, setTxCurrDatam45] = useState(0);
const [txCurrDatam50, setTxCurrDatam50] = useState(0);
const [txCurrDatam55, setTxCurrDatam55] = useState(0);
const [txCurrDatam60, setTxCurrDatam60] = useState(0);
const [txCurrDatam65, setTxCurrDatam65] = useState(0);

  // //variables for disaggregation Tx_Curr(Male)
  // let countTxCurrf0 = 0;
  // let countTxCurrf5 = 0;
  // let countTxCurrf10 = 0;
  // let countTxCurrf15 = 0;
  // let countTxCurrf20 = 0;
  // let countTxCurrf25 = 0;
  // let countTxCurrf30 = 0;
  // let countTxCurrf35 = 0;
  // let countTxCurrf40 = 0;
  // let countTxCurrf45 = 0;
  // let countTxCurrf50 = 0;
  // let countTxCurrf55 = 0;
  // let countTxCurrf65 = 0;
const [txCurrDataf0, setTxCurrDataf0] = useState(0);
const [txCurrDataf5, setTxCurrDataf5] = useState(0);
const [txCurrDataf10, setTxCurrDataf10] = useState(0);
const [txCurrDataf15, setTxCurrDataf15] = useState(0);
const [txCurrDataf20, setTxCurrDataf20] = useState(0);
const [txCurrDataf25, setTxCurrDataf25] = useState(0);
const [txCurrDataf30, setTxCurrDataf30] = useState(0);
const [txCurrDataf35, setTxCurrDataf35] = useState(0);
const [txCurrDataf40, setTxCurrDataf40] = useState(0);
const [txCurrDataf45, setTxCurrDataf45] = useState(0);
const [txCurrDataf50, setTxCurrDataf50] = useState(0);
const [txCurrDataf55, setTxCurrDataf55] = useState(0);
const [txCurrDataf60, setTxCurrDataf60] = useState(0);
const [txCurrDataf65, setTxCurrDataf65] = useState(0);

const [htsTstPosData, setHtsTstPosData] = useState(0);
let countAbiaHTSPos = 0;
let countEnuguHTSPos = 0;
let countImoHTSPos = 0;
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
let countHTSPOSm60 = 0;
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
const [htsTstPosDatam60, setHtsTstPosDatam60] = useState(0);
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
let countHTSPOSf60 = 0;
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
const [htsTstPosDataf60, setHtsTstPosDataf60] = useState(0);
const [htsTstPosDataf65, setHtsTstPosDataf65] = useState(0);

// Linkage
const [linkageData, setLinkageData] = useState(0);
const [linkageDatam0, setLinkageDatam0] = useState(0);
const [linkageDatam5, setLinkageDatam5] = useState(0);
const [linkageDatam10, setLinkageDatam10] = useState(0);
const [linkageDatam15, setLinkageDatam15] = useState(0);
const [linkageDatam20, setLinkageDatam20] = useState(0);
const [linkageDatam25, setLinkageDatam25] = useState(0);
const [linkageDatam30, setLinkageDatam30] = useState(0);
const [linkageDatam35, setLinkageDatam35] = useState(0);
const [linkageDatam40, setLinkageDatam40] = useState(0);
const [linkageDatam45, setLinkageDatam45] = useState(0);
const [linkageDatam50, setLinkageDatam50] = useState(0);
const [linkageDatam55, setLinkageDatam55] = useState(0);
const [linkageDatam60, setLinkageDatam60] = useState(0);
const [linkageDatam65, setLinkageDatam65] = useState(0);

const [linkageDataf0, setLinkageDataf0] = useState(0);
const [linkageDataf5, setLinkageDataf5] = useState(0);
const [linkageDataf10, setLinkageDataf10] = useState(0);
const [linkageDataf15, setLinkageDataf15] = useState(0);
const [linkageDataf20, setLinkageDataf20] = useState(0);
const [linkageDataf25, setLinkageDataf25] = useState(0);
const [linkageDataf30, setLinkageDataf30] = useState(0);
const [linkageDataf35, setLinkageDataf35] = useState(0);
const [linkageDataf40, setLinkageDataf40] = useState(0);
const [linkageDataf45, setLinkageDataf45] = useState(0);
const [linkageDataf50, setLinkageDataf50] = useState(0);
const [linkageDataf55, setLinkageDataf55] = useState(0);
const [linkageDataf60, setLinkageDataf60] = useState(0);
const [linkageDataf65, setLinkageDataf65] = useState(0);




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
  getTreatment();
  }
  }, [selectedState, selectedLGAs, selectedFacility, startDate, endDate]);
  function getTreatment(e){
    //e.preventDefault();
 const bURL = process.env.baseURL;
     const treatmentDataType = {
         state: selectedState,
         lga: selectedLGAs,
         facility: selectedFacility,
         dateFrom: startDate,
         dateTo: endDate,
     };

     
    //  function htsChartCheck(){
    //   if(selectedState.length == 0 ){
    //     <div></div>
    //   }else{
    //     <GraphCard/>

    //   }
      
     

   


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
        setStateTotal(states.length);
      };
      if(selectedLGAs.length == 0){
        setLgaTotal(lga.length);
      };
      if(filter_lgas.length == 0){
        setFacilityTotal(facilities.length)
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
 
                //Endpoint for Tx_New Data
                 axios.post(bURL + "htscharts/txnew", treatmentDataType,).then((response)=>{
                 
                     console.log(response.data);
                     
                     //console.log(response.data.charts);
                     const vlChart = response.data;
                     vlChart.filter((data) => data.state === 'Abia').map(data => {countAbiaTxNew = countAbiaTxNew + data.total_aggregate;})
                    vlChart.filter((data1) => data1.state === 'Enugu').map(data1 => {countEnuguTxNew = countEnuguTxNew + data1.total_aggregate;})
                    vlChart.filter((data2) => data2.state === 'Imo').map(data2 => {countImoTxNew = countImoTxNew + data2.total_aggregate;})
                    setTxNewData(countAbiaTxNew+countEnuguTxNew+countImoTxNew);
                    // console.log(vlEligibleState);
                    //console.log(countAbia);
                    //console.log(countEnugu);
                    //console.log(countImo);
                    //console.log(vlEligibleImo);
                    setTxNewDataAbia(countAbiaTxNew);
                    setTxNewDataEnugu(countEnuguTxNew);
                    setTxNewDataImo(countImoTxNew);

                    //Disaggregation Data HTS_TST(Male)
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxNewm0 = countTxNewm0 + data2.less_than_one;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxNewm5 = countTxNewm5 + data2.from_5_9;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxNewm10 = countTxNewm10 + data2.from_10_14;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxNewm15 = countTxNewm15 + data2.from_15_19;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxNewm20 = countTxNewm20 + data2.from_20_24;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxNewm25 = countTxNewm25 + data2.from_25_29;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxNewm30 = countTxNewm30 + data2.from_30_34;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxNewm35 = countTxNewm35 + data2.from_35_39;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxNewm40 = countTxNewm40 + data2.from_40_44;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxNewm45 = countTxNewm45 + data2.from_45_49;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxNewm50 = countTxNewm50 + data2.from_50_54;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxNewm55 = countTxNewm55 + data2.from_55_59;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxNewm60 = countTxNewm60 + data2.from_60_64;})
                 vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxNewm65 = countTxNewm65 + data2.from_65_above;})
                 setTxNewDatam0(countTxNewm0);
                 setTxNewDatam5(countTxNewm5);
                 setTxNewDatam10(countTxNewm10);
                 setTxNewDatam15(countTxNewm15);
                 setTxNewDatam20(countTxNewm20);
                 setTxNewDatam25(countTxNewm25);
                 setTxNewDatam30(countTxNewm30);
                 setTxNewDatam35(countTxNewm35);
                 setTxNewDatam40(countTxNewm40);
                 setTxNewDatam45(countTxNewm45);
                 setTxNewDatam50(countTxNewm50);
                 setTxNewDatam55(countTxNewm55);
                 setTxNewDatam60(countTxNewm60);
                 setTxNewDatam65(countTxNewm65);
                 
                 //Disaggregation Data HTS_TST(Female)
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxNewf0 = countTxNewf0 + data2.less_than_one;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxNewf5 = countTxNewf5 + data2.from_5_9;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxNewf10 = countTxNewf10 + data2.from_10_14;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxNewf15 = countTxNewf15 + data2.from_15_19;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxNewf20 = countTxNewf20 + data2.from_20_24;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxNewf25 = countTxNewf25 + data2.from_25_29;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxNewf30 = countTxNewf30 + data2.from_30_34;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxNewf35 = countTxNewf35 + data2.from_35_39;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxNewf40 = countTxNewf40 + data2.from_40_44;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxNewf45 = countTxNewf45 + data2.from_45_49;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxNewf50 = countTxNewf50 + data2.from_50_54;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxNewf55 = countTxNewf55 + data2.from_55_59;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxNewf60 = countTxNewf60 + data2.from_60_64;})
                 vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxNewf65 = countTxNewf65 + data2.from_65_above;})
                 setTxNewDataf0(countTxNewf0);
                 setTxNewDataf5(countTxNewf5);
                 setTxNewDataf10(countTxNewf10);
                 setTxNewDataf15(countTxNewf15);
                 setTxNewDataf20(countTxNewf20);
                 setTxNewDataf25(countTxNewf25);
                 setTxNewDataf30(countTxNewf30);
                 setTxNewDataf35(countTxNewf35);
                 setTxNewDataf40(countTxNewf40);
                 setTxNewDataf45(countTxNewf45);
                 setTxNewDataf50(countTxNewf50);
                 setTxNewDataf55(countTxNewf55);
                 setTxNewDataf60(countTxNewf60);
                 setTxNewDataf65(countTxNewf65);
                 
                     
                 });

                    //Endpoint for HTS POS Data
                    axios.post(bURL + "htscharts/pos", treatmentDataType).then((response)=>{
                  
                     const vlChart = response.data;
                     //console.log(response.data)
                     vlChart.filter((data) => data.state === 'Abia').map(data => {countAbiaHTSPos = countAbiaHTSPos + data.total_aggregate;})
                     vlChart.filter((data1) => data1.state === 'Enugu').map(data1 => {countEnuguHTSPos = countEnuguHTSPos + data1.total_aggregate;})
                     vlChart.filter((data2) => data2.state === 'Imo').map(data2 => {countImoHTSPos = countImoHTSPos + data2.total_aggregate;})
                     setHtsTstPosData(countAbiaHTSPos+countEnuguHTSPos+countImoHTSPos);
                     
    
                     
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
                     vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSPOSm60 = countHTSPOSm60 + data2.from_60_64;})
                     vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countHTSPOSm65 = countHTSPOSm65 + data2.from_65_above;})
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
                     setHtsTstPosDatam60(countHTSPOSm60);
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
                     vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSPOSf60 = countHTSPOSf60 + data2.from_60_64;})
                     vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countHTSPOSf65 = countHTSPOSf65 + data2.from_65_above;})
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
                     setHtsTstPosDataf60(countHTSPOSf60);
                     setHtsTstPosDataf65(countHTSPOSf65);
                     
                     
                     
                     
                     
                     
                      
                  });
                  
                  //Endpoint for Tx_Cur Data
                 axios.get(bURL + "report/").then((response)=>{});

                 //Endpoint for Tx_Cur Data
                 axios.get(bURL + "report/").then((response)=>{
                //console.log(response.data);
              
                 const vlChart = response.data;
                 // Filter and count 'Active' clients for specific states
const abiaActiveCount = vlChart.filter(data => data.status === 'Active').length;
setTxCurrData(vlChart.filter(data => data.status === 'Active').length);
                  //Age Segregation For Male
                 setTxCurrDatam0(vlChart.filter(data => data.status === 'Active' && data.sex === 'M' && data.ageGroup === '0 - 4' ).length);
                 setTxCurrDatam5(vlChart.filter(data => data.status === 'Active' && data.sex === 'M' && data.ageGroup === '5 - 9' ).length);
                 setTxCurrDatam10(vlChart.filter(data => data.status === 'Active' && data.sex === 'M' && data.ageGroup === '10 - 14' ).length);
                 setTxCurrDatam15(vlChart.filter(data => data.status === 'Active' && data.sex === 'M' && data.ageGroup === '14 - 19' ).length);
                 setTxCurrDatam20(vlChart.filter(data => data.status === 'Active' && data.sex === 'M' && data.ageGroup === '20 - 24' ).length);
                 setTxCurrDatam25(vlChart.filter(data => data.status === 'Active' && data.sex === 'M' && data.ageGroup === '25 - 29' ).length);
                 setTxCurrDatam30(vlChart.filter(data => data.status === 'Active' && data.sex === 'M' && data.ageGroup === '30 - 34' ).length);
                 setTxCurrDatam35(vlChart.filter(data => data.status === 'Active' && data.sex === 'M' && data.ageGroup === '35 - 39' ).length);
                 setTxCurrDatam40(vlChart.filter(data => data.status === 'Active' && data.sex === 'M' && data.ageGroup === '40 - 44' ).length);
                 setTxCurrDatam45(vlChart.filter(data => data.status === 'Active' && data.sex === 'M' && data.ageGroup === '45 - 49' ).length);
                 setTxCurrDatam50(vlChart.filter(data => data.status === 'Active' && data.sex === 'M' && data.age >= '50'  && data.age >= '54' ).length);
                 setTxCurrDatam55(vlChart.filter(data => data.status === 'Active' && data.sex === 'M' && data.age >= '55'  && data.age >= '59' ).length);
                 setTxCurrDatam60(vlChart.filter(data => data.status === 'Active' && data.sex === 'M' && data.age >= '60'  && data.age >= '64' ).length);
                 setTxCurrDatam65(vlChart.filter(data => data.status === 'Active' && data.sex === 'M' && data.age >= '65' ).length);

                  //Age segregation for Female
                  setTxCurrDataf0(vlChart.filter(data => data.status === 'Active' && data.sex === 'F' && data.ageGroup === '0 - 4' ).length);
                 setTxCurrDataf5(vlChart.filter(data => data.status === 'Active' && data.sex === 'F' && data.ageGroup === '5 - 9' ).length);
                 setTxCurrDataf10(vlChart.filter(data => data.status === 'Active' && data.sex === 'F' && data.ageGroup === '10 - 14' ).length);
                 setTxCurrDataf15(vlChart.filter(data => data.status === 'Active' && data.sex === 'F' && data.ageGroup === '14 - 19' ).length);
                 setTxCurrDataf20(vlChart.filter(data => data.status === 'Active' && data.sex === 'F' && data.ageGroup === '20 - 24' ).length);
                 setTxCurrDataf25(vlChart.filter(data => data.status === 'Active' && data.sex === 'F' && data.ageGroup === '25 - 29' ).length);
                 setTxCurrDataf30(vlChart.filter(data => data.status === 'Active' && data.sex === 'F' && data.ageGroup === '30 - 34' ).length);
                 setTxCurrDataf35(vlChart.filter(data => data.status === 'Active' && data.sex === 'F' && data.ageGroup === '35 - 39' ).length);
                 setTxCurrDataf40(vlChart.filter(data => data.status === 'Active' && data.sex === 'F' && data.ageGroup === '40 - 44' ).length);
                 setTxCurrDataf45(vlChart.filter(data => data.status === 'Active' && data.sex === 'F' && data.ageGroup === '45 - 49' ).length);
                 setTxCurrDataf50(vlChart.filter(data => data.status === 'Active' && data.sex === 'F' && data.age >= '50'  && data.age >= '54' ).length);
                 setTxCurrDataf55(vlChart.filter(data => data.status === 'Active' && data.sex === 'F' && data.age >= '55'  && data.age >= '59' ).length);
                 setTxCurrDataf60(vlChart.filter(data => data.status === 'Active' && data.sex === 'F' && data.age >= '60'  && data.age >= '64' ).length);
                 setTxCurrDataf65(vlChart.filter(data => data.status === 'Active' && data.sex === 'F' && data.age >= '65' ).length);
                

               

//console.log("Abia Active Count:", abiaActiveCount);


                 //.map(data => {countAbiaTxCurr = countAbiaTxCurr + data.total_aggregate;})
                
                 
                //  vlChart.filter((data) => data.state === 'Abia').map(data => {countAbiaTxCurr = countAbiaTxCurr + data.total_aggregate;})
                //  vlChart.filter((data1) => data1.state === 'Enugu').map(data1 => {countEnuguTxCurr = countEnuguTxCurr + data1.total_aggregate;})
                //  vlChart.filter((data2) => data2.state === 'Imo').map(data2 => {countImoTxCurr = countImoTxCurr + data2.total_aggregate;})
                //  setTxCurrData(countAbiaTxCurr+countEnuguTxCurr+countImoTxCurr);
                //  setTxCurrDataAbia(countAbiaTxCurr);
                //  setTxCurrDataAbia(countAbiaTxCurr);
                //  setTxCurrDataEnugu(countEnuguTxCurr);
                //  setTxCurrDataImo(countImoTxCurr);

                 
                //  //Disaggregation Data HTS_TST_POS(Male)
                //  vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxCurrm0 = countTxCurrm0 + data2.less_than_one;})
                //  vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxCurrm5 = countTxCurrm5 + data2.from_5_9;})
                //  vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxCurrm10 = countTxCurrm10 + data2.from_10_14;})
                //  vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxCurrm15 = countTxCurrm15 + data2.from_15_19;})
                //  vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxCurrm20 = countTxCurrm20 + data2.from_20_24;})
                //  vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxCurrm25 = countTxCurrm25 + data2.from_25_29;})
                //  vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxCurrm30 = countTxCurrm30 + data2.from_30_34;})
                //  vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxCurrm35 = countTxCurrm35 + data2.from_35_39;})
                //  vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxCurrm40 = countTxCurrm40 + data2.from_40_44;})
                //  vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxCurrm45 = countTxCurrm45 + data2.from_45_49;})
                //  vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxCurrm50 = countTxCurrm50 + data2.from_50_54;})
                //  vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxCurrm55 = countTxCurrm55 + data2.from_55_59;})
                //  vlChart.filter((data2) => data2.sex === 'male').map(data2 => {countTxCurrm65 = countTxCurrm65 + data2.from_25_29;})
                //  setTxCurrDatam0(countTxCurrm0);
                //  setTxCurrDatam5(countTxCurrm5);
                //  setTxCurrDatam10(countTxCurrm10);
                //  setTxCurrDatam15(countTxCurrm15);
                //  setTxCurrDatam20(countTxCurrm20);
                //  setTxCurrDatam25(countTxCurrm25);
                //  setTxCurrDatam30(countTxCurrm30);
                //  setTxCurrDatam35(countTxCurrm35);
                //  setTxCurrDatam40(countTxCurrm40);
                //  setTxCurrDatam45(countTxCurrm45);
                //  setTxCurrDatam50(countTxCurrm50);
                //  setTxCurrDatam55(countTxCurrm55);
                //  setTxCurrDatam65(countTxCurrm65);

                //  //Disaggregation Data HTS_TST_POS(Female)
                //  vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxCurrf0 = countTxCurrf0 + data2.less_than_one;})
                //  vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxCurrf5 = countTxCurrf5 + data2.from_5_9;})
                //  vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxCurrf10 = countTxCurrf10 + data2.from_10_14;})
                //  vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxCurrf15 = countTxCurrf15 + data2.from_15_19;})
                //  vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxCurrf20 = countTxCurrf20 + data2.from_20_24;})
                //  vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxCurrf25 = countTxCurrf25 + data2.from_25_29;})
                //  vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxCurrf30 = countTxCurrf30 + data2.from_30_34;})
                //  vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxCurrf35 = countTxCurrf35 + data2.from_35_39;})
                //  vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxCurrf40 = countTxCurrf40 + data2.from_40_44;})
                //  vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxCurrf45 = countTxCurrf45 + data2.from_45_49;})
                //  vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxCurrf50 = countTxCurrf50 + data2.from_50_54;})
                //  vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxCurrf55 = countTxCurrf55 + data2.from_55_59;})
                //  vlChart.filter((data2) => data2.sex === 'female').map(data2 => {countTxCurrf65 = countTxCurrf65 + data2.from_25_29;})
                //  setTxCurrDataf0(countTxCurrf0);
                //  setTxCurrDataf5(countTxCurrf5);
                //  setTxCurrDataf10(countTxCurrf10);
                //  setTxCurrDataf15(countTxCurrf15);
                //  setTxCurrDataf20(countTxCurrf20);
                //  setTxCurrDataf25(countTxCurrf25);
                //  setTxCurrDataf30(countTxCurrf30);
                //  setTxCurrDataf35(countTxCurrf35);
                //  setTxCurrDataf40(countTxCurrf40);
                //  setTxCurrDataf45(countTxCurrf45);
                //  setTxCurrDataf50(countTxCurrf50);
                //  setTxCurrDataf55(countTxCurrf55);
                //  setTxCurrDataf65(countTxCurrf65);
                 
                 
                 
                 
                 
                 
                  
              });

                

              let yieldTotal = txCurrData /txNewData*100;
              //console.log(yieldTotal)
              let roundedYieldTotal = yieldTotal.toFixed();
              setYieldTotal(roundedYieldTotal);

              setLinkageData(txNewData/htsTstPosData*100)
              setLinkageDatam0(txNewDatam0/htsTstPosDatam0*100)
              setLinkageDatam5(txNewDatam5/htsTstPosDatam5*100)
              setLinkageDatam10(txNewDatam10/htsTstPosDatam10*100)
              setLinkageDatam15(txNewDatam15/htsTstPosDatam15*100)
              setLinkageDatam20(txNewDatam20/htsTstPosDatam20*100)
              setLinkageDatam25(txNewDatam25/htsTstPosDatam25*100)
              setLinkageDatam30(txNewDatam30/htsTstPosDatam30*100)
              setLinkageDatam35(txNewDatam35/htsTstPosDatam35*100)
              setLinkageDatam40(txNewDatam40/htsTstPosDatam40*100)
              setLinkageDatam45(txNewDatam45/htsTstPosDatam45*100)
              setLinkageDatam50(txNewDatam50/htsTstPosDatam50*100)
              setLinkageDatam55(txNewDatam55/htsTstPosDatam55*100)
              setLinkageDatam60(txNewDatam60/htsTstPosDatam60*100)
              setLinkageDatam65(txNewDatam65/htsTstPosDatam65*100)
              
              setLinkageDataf0(txNewDataf0/htsTstPosDataf0*100)
              setLinkageDataf5(txNewDataf5/htsTstPosDataf5*100)
              setLinkageDataf10(txNewDataf10/htsTstPosDataf10*100)
              setLinkageDataf15(txNewDataf15/htsTstPosDataf15*100)
              setLinkageDataf20(txNewDataf20/htsTstPosDataf20*100)
              setLinkageDataf25(txNewDataf25/htsTstPosDataf25*100)
              setLinkageDataf30(txNewDataf30/htsTstPosDataf30*100)
              setLinkageDataf35(txNewDataf35/htsTstPosDataf35*100)
              setLinkageDataf40(txNewDataf40/htsTstPosDataf40*100)
              setLinkageDataf45(txNewDataf45/htsTstPosDataf45*100)
              setLinkageDataf50(txNewDataf50/htsTstPosDataf50*100)
              setLinkageDataf55(txNewDataf55/htsTstPosDataf55*100)
              setLinkageDataf60(txNewDataf60/htsTstPosDataf60*100)
              setLinkageDataf65(txNewDataf65/htsTstPosDataf65*100)


              

                

             } catch (error) {
                 console.log(error);
             }
 
 }
return (
  <div className="container mt-3">
  <div className="row">
    <div className="col-md-12 text-center p-3"><h3>Treatment</h3></div>
  </div>
  {/* LineBar View */}
  <div className="row">
    <div className="col-md-3 linelist-bar">
      <FacilityListComponent handleFunction={getTreatment} />
      
     
    </div>
     {/* Monitoring Row View */}
    <div className="col-md-9">
      <div className="row monitoring-row">
      <TreatmentCard 
        upper_indicator="TX_NEW" 
        upper_value = {txNewData}
        //iconType="fa-solid fa-syringe" 
         />
         <TreatmentCard  upper_indicator="LINKAGE" 
        upper_value = {`${linkageData.toFixed()}%`}
        //iconType="fa-solid fa-user-plus" 
         />
      <TreatmentCard  upper_indicator="TX_CURR" 
        upper_value = {txCurrData}
        //iconType="fa-solid fa-user-plus" 
         />
      

      

<TreatmentCard  upper_indicator="TX_ML" 
        upper_value = "183,263"
        //iconType="fa-solid fa-user-plus" 
         />

<TreatmentCard  upper_indicator="TX_RTT" 
        upper_value = "183,263"
        //iconType="fa-solid fa-user-plus" 
         />

      
      </div>
       {/* Graph View */}

       

      <div className="row">
        {selectedFacility.length=== 0 && <GraphCard indicator = "TX_NEW " description="BY SEX AND POPULATION" chartType={<StackedBarChart m65={-txNewDatam65} f65={txNewDataf65} m60={-txNewDatam60} f60={txNewDataf60} m55={-txNewDatam55} f55={txNewDataf55} m50={-txNewDatam50} f50={txNewDataf50} m45={-txNewDatam45} f45={txNewDataf45} m40={-txNewDatam40} f40={txNewDataf40} m35={-txNewDatam35} f35={txNewDataf35} m30={-txNewDatam30} f30={txNewDataf30} m25={-txNewDatam25} f25={txNewDataf25} m20={-txNewDatam20} f20={txNewDataf20} m15={-txNewDatam15} f15={txNewDataf15} m10={-txNewDatam10} f10={txNewDataf10} m5={-txNewDatam5} f5={txNewDataf5} m0={-txNewDatam0} f0={txNewDataf0} chartTypeNumber={2}/>}/>}
        
      </div>

      

      <div className="row">
      <GraphCard indicator = "LINKAGE " description="BY SEX AND POPULATION" chartType={<LinkageChart m65={-linkageDatam65} f65={linkageDataf65} m55={-linkageDatam55} f55={linkageDataf55} m50={-linkageDatam50} f50={linkageDataf50} m45={-linkageDatam45} f45={linkageDataf45} m40={-linkageDatam40} f40={linkageDataf40} m35={-linkageDatam35} f35={linkageDataf35} m30={-linkageDatam30} f30={linkageDataf30} m25={-linkageDatam25} f25={linkageDataf25} m20={-linkageDatam20} f20={linkageDataf20} m15={-linkageDatam15} f15={linkageDataf15} m10={-linkageDatam10} f10={linkageDataf10} m5={-linkageDatam5} f5={linkageDataf5} m0={-linkageDatam0} f0={linkageDataf0} chartTypeNumber={5}/>}/>

        
      </div>

      <div className="row">
      <GraphCard indicator = "TX_CURR " description="BY SEX AND POPULATION" chartType={<StackedBarChart m65={-txCurrDatam65} f65={txCurrDataf65} m60={-txCurrDatam60} f60={txCurrDataf60} m55={-txCurrDatam55} f55={txCurrDataf55} m50={-txCurrDatam50} f50={txCurrDataf50} m45={-txCurrDatam45} f45={txCurrDataf45} m40={-txCurrDatam40} f40={txCurrDataf40} m35={-txCurrDatam35} f35={txCurrDataf35} m30={-txCurrDatam30} f30={txCurrDataf30} m25={-txCurrDatam25} f25={txCurrDataf25} m20={-txCurrDatam20} f20={txCurrDataf20} m15={-txCurrDatam15} f15={txCurrDataf15} m10={-txCurrDatam10} f10={txCurrDataf10} m5={-txCurrDatam5} f5={txCurrDataf5} m0={-txCurrDatam0} f0={txCurrDataf0} chartTypeNumber={3}/>}/>

        
      </div>

      <div className="row">
      <GraphCard indicator = "MMD DISAGGREGATION" description="BY AGE BANDS" chartType={<CombinedBulletLineGraph chartTypeNumber={13}/>}/>

        
      </div>




      <div className="row">
      <GraphCard indicator = "TX_ML and TX_RTT " description="" chartType={<GroupedAndSortedColumnsChart chartTypeNumber={6}/>}/>

        
      </div>
   
  </div>
  </div>
 
</div>
)



};

export default Treatment;
