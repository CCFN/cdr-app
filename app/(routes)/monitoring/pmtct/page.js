'use client'
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "next/link";
import FacilityListComponent from "../monitoring-components/facilityListComponent";
import LocationCard from "../monitoring-components/locationCard";
import ViralLoadCard from "../monitoring-components/vlCard";
import GraphCard from "../monitoring-components/graphCard";
import DragOrderBarChart from "../monitoring-components/dragOrderBar";
import ClusteredColumnChart from "../monitoring-components/clusteredColumnChart";
import DonutWithRadialGradient from "../monitoring-components/donutWithRadialGradient";
import ThreeDPieChart from "../monitoring-components/threeDPieChart";

function Pmtct () {
  const [data, setData] = useState([]);
return (
  <div className="container mt-3">
    <div className="row">
      <div className="col-md-12 text-center p-3"><h3>PMTCT</h3></div>
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
          upper_indicator="PMTCT ARV" 
          upper_value = "60,011"
          ></ViralLoadCard>

          <ViralLoadCard
          upper_indicator="VL Eligible" 
          upper_value = "60,011"
          ></ViralLoadCard>

          <ViralLoadCard
          upper_indicator="VL Samples" 
          upper_value = "60,011"
          ></ViralLoadCard>

          <ViralLoadCard
          upper_indicator="VL Result" 
          upper_value = "60,011"
          ></ViralLoadCard>

          <ViralLoadCard
          upper_indicator="Suppressed" 
          upper_value = "60,011"
          ></ViralLoadCard>

          <ViralLoadCard
          upper_indicator="Unsuppressed" 
          upper_value = "60,011"
          ></ViralLoadCard>
          
        </div>

        <div className="row">
          <GraphCard indicator = "PMTCT VL CASCADE " description="KEY METRICS OVERVIEW" chartType={<DragOrderBarChart chartTypeNumber={30} />} />
          
        </div>

        <div className="row">
          <GraphCard indicator = "PMTCT STATUS " description="KEY METRICS OVERVIEW" chartType={<DonutWithRadialGradient chartTypeNumber={31} />} />
          
        </div>

        <div className="row">
          <GraphCard indicator = "PMTCT ENTRY POINT " description="KEY METRICS OVERVIEW" chartType={<ThreeDPieChart chartTypeNumber={32} />} />
          
        </div>


      </div>

      
    </div>
  </div>
)



};

export default Pmtct;
