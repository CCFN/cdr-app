'use client'
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "next/link";
import FacilityListComponent from "../monitoring-components/facilityListComponent";

function Ncd () {
  const [data, setData] = useState([]);
return (
  <div className="container mt-3">
    <div className="row">
      <div className="col-md-12 text-center p-3"><h3>Non-Communicable Disease</h3></div>
    </div>
    <div className="row">
      <div className="col-md-3 linelist-bar">
        <FacilityListComponent />
      </div>
    </div>
  </div>
)



};

export default Ncd;
