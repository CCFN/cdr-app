"use client"
//import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import React, { useEffect,} from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from "@amcharts/amcharts4/maps";

import am4geodata_nigeriaLow from "@amcharts/amcharts4-geodata/nigeriaLow";
//import am4themes_animated from '@amcharts/amcharts4/themes/animated';

//am4core.useTheme(am4themes_animated);
am4core.options.autoDispose = true;
const NigerianMap = () => {
  useEffect(() => {
// Create chart instance
let mainContainer = am4core.create("chartdiv1", am4core.Container);
mainContainer.width = am4core.percent(100);
mainContainer.height = am4core.percent(100);
mainContainer.layout = "horizontal";


let mapChart = mainContainer.createChild(am4maps.MapChart);
mapChart.projection = new am4maps.projections.Mercator();
mapChart.geodata = am4geodata_nigeriaLow;
mapChart.zoomControl = new am4maps.ZoomControl();
mapChart.zIndex = -1;

let polygonSeries = mapChart.series.push(new am4maps.MapPolygonSeries())
polygonSeries.useGeodata = true;

let polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.togglable = true;

let hoverState = polygonTemplate.states.create("hover");
hoverState.properties.fill = mapChart.colors.getIndex(2);

let activeState = polygonTemplate.states.create("active");
activeState.properties.fill = mapChart.colors.getIndex(5);

let label = mainContainer.createChild(am4core.Label);
label.isMeasured = false;
label.x = am4core.percent(80);
label.horizontalCenter = "middle";
label.y = 50;
label.showOnInit = true;
//label.text = "Nigeria Testing pyramid";
label.hiddenState.properties.dy = -100;

    return () => {
      
      mainContainer.dispose();
    };
}, []);
// Clean up the chart when the component unmounts


  
return <div className='mt-3' id="chartdiv1" style={{ width: '100%', height: '350px' }} />;

};

export default NigerianMap;
