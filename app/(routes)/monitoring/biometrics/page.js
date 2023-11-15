'use client'
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "next/link";
import FacilityListComponent from "../monitoring-components/facilityListComponent";
import LocationCard from "../monitoring-components/locationCard";
import ViralLoadCard from "../monitoring-components/vlCard";
import GraphCard from "../monitoring-components/graphCard";
import BarsWithMovingBullets from "../monitoring-components/barsWithMovingBulletChart";
import SortedBarChart from "../monitoring-components/sortedBarChart";
import HybridDrillDownPieChart from "../monitoring-components/hybridDrillDownPieChart";
import ClusteredColumnChart from "../monitoring-components/clusteredColumnChart";
import ClusteredColumnChart2 from "../monitoring-components/clusteredColumnChart2";

function Biometrics () {
  const [data, setData] = useState([]);
return (
  <div className="container mt-3">
    <div className="row">
      <div className="col-md-12 text-center p-3"><h3>Biometrics</h3></div>
    </div>
    <div className="row">
      <div className="col-md-3 linelist-bar">
        <FacilityListComponent />
      </div>
      <div className="col-md-9">
        <div className="row monitoring-row">
          <LocationCard
          upper_indicator="STATE" 
          upper_value = "3"
          ></LocationCard>
          
          <LocationCard
          upper_indicator="LGA(s)" 
          upper_value = "3"
          ></LocationCard>

          <LocationCard
          upper_indicator="FACILITIES" 
          upper_value = "3"
          ></LocationCard>

        </div>
        
        <div className="row monitoring-row">
          <ViralLoadCard
          upper_indicator="Tx_Curr" 
          upper_value = "60,011"
          ></ViralLoadCard>

          <ViralLoadCard
          upper_indicator="Tx_New" 
          upper_value = "60,011"
          ></ViralLoadCard>

          <ViralLoadCard
          upper_indicator="Encounters" 
          upper_value = "60,011"
          ></ViralLoadCard>

          <ViralLoadCard
          upper_indicator="Base Captures" 
          upper_value = "60,011"
          ></ViralLoadCard>

          <ViralLoadCard
          upper_indicator="Re-Captures" 
          upper_value = "60,011"
          ></ViralLoadCard>

          

        </div>

        <div className="row">
          <GraphCard indicator = "BIOMETRICS CASCADE " description="KEY METRICS OVERVIEW" chartType={<ClusteredColumnChart2 chartTypeNumber={23} />} />
          
        </div>

        <div className="row">
          <GraphCard indicator = "RE-CAPTURE CASCADE " description="KEY METRICS OVERVIEW" chartType={<HybridDrillDownPieChart chartTypeNumber={22}/>} />
          
        </div>

      </div>


    </div>
  </div>
)



};

export default Biometrics;
