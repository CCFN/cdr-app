
//import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import React, { useEffect, useRef } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from "@amcharts/amcharts4/maps";

import am4geodata_nigeriaLow from "@amcharts/amcharts4-geodata/nigeriaLow";
//import am4themes_animated from '@amcharts/amcharts4/themes/animated';

//am4core.useTheme(am4themes_animated);
am4core.options.autoDispose = true;
const PopulationPyramidChart = ({m65,f65,m60,f60,m55,f55,m50,f50,m45,f45,m40,f40,m35,f35,m30,f30,m25,f25,m20,f20,m15,f15,m10,f10,m5,f5,m0,f0,chartTypeNumber}) => {
  const chartTypeNoDesc = "chartDiv"+ chartTypeNumber;
  const chartRef = useRef(null);

  useEffect(() => {
// Create chart instance
let mainContainer = am4core.create(chartTypeNoDesc, am4core.Container);
mainContainer.width = am4core.percent(100);
mainContainer.height = am4core.percent(100);
mainContainer.layout = "horizontal";

let ngData = [
  {
    "age": "0 to 5",
    "male": m0,
    "female": f0
  },
  {
    "age": "5 to 9",
    "male": m5,
    "female": f5
  },
  {
    "age": "10 to 14",
    "male": m10,
    "female": f10
  },
  {
    "age": "15 to 19",
    "male": m15,
    "female": f15
  },
  {
    "age": "20 to 24",
    "male": m20,
    "female": f20
  },
  {
    "age": "25 to 29",
    "male": m25,
    "female": f25
  },
  {
    "age": "30 to 34",
    "male": m30,
    "female": f30
  },
  {
    "age": "35 to 39",
    "male": m35,
    "female": f35
  },
  {
    "age": "40 to 44",
    "male": m40,
    "female": f40
  },
  {
    "age": "45 to 49",
    "male": m45,
    "female": f45
  },
  {
    "age": "50 to 54",
    "male": m50,
    "female": f50
  },
  {
    "age": "55 to 59",
    "male": m55,
    "female": f55
  },{
    "age": "60 to 64",
    "male": m60,
    "female": f60
  },
  {
    "age": "65 and Older",
    "male": m65,
    "female": f65  }
];

let maleChart = mainContainer.createChild(am4charts.XYChart);
maleChart.paddingRight = 0;
maleChart.data = JSON.parse(JSON.stringify(ngData));

// Create axes
let maleCategoryAxis = maleChart.yAxes.push(new am4charts.CategoryAxis());
maleCategoryAxis.dataFields.category = "age";
maleCategoryAxis.renderer.grid.template.location = 0;
//maleCategoryAxis.renderer.inversed = true;
maleCategoryAxis.renderer.minGridDistance = 15;

let maleValueAxis = maleChart.xAxes.push(new am4charts.ValueAxis());
maleValueAxis.renderer.inversed = true;
maleValueAxis.min = 0;
maleValueAxis.max = 10;
maleValueAxis.strictMinMax = true;

maleValueAxis.numberFormatter = new am4core.NumberFormatter();
maleValueAxis.numberFormatter.numberFormat = "#.#'%'";

// Create series
let maleSeries = maleChart.series.push(new am4charts.ColumnSeries());
maleSeries.dataFields.valueX = "male";
maleSeries.dataFields.valueXShow = "percent";
maleSeries.calculatePercent = true;
maleSeries.dataFields.categoryY = "age";
maleSeries.interpolationDuration = 1000;
maleSeries.columns.template.tooltipText = "Males, age{categoryY}: {valueX} ({valueX.percent.formatNumber('#.0')}%)";
//maleSeries.sequencedInterpolation = true;


let femaleChart = mainContainer.createChild(am4charts.XYChart);
femaleChart.paddingLeft = 0;
femaleChart.data = JSON.parse(JSON.stringify(ngData));
console.log(femaleChart);

// Create axes
let femaleCategoryAxis = femaleChart.yAxes.push(new am4charts.CategoryAxis());
femaleCategoryAxis.renderer.opposite = true;
femaleCategoryAxis.dataFields.category = "age";
femaleCategoryAxis.renderer.grid.template.location = 0;
femaleCategoryAxis.renderer.minGridDistance = 15;


let femaleValueAxis = femaleChart.xAxes.push(new am4charts.ValueAxis());
femaleValueAxis.min = 0;
femaleValueAxis.max = 10;
femaleValueAxis.strictMinMax = true;
femaleValueAxis.numberFormatter = new am4core.NumberFormatter();
femaleValueAxis.numberFormatter.numberFormat = "#.#'%'";
femaleValueAxis.renderer.minLabelPosition = 0.01;

// Create series
let femaleSeries = femaleChart.series.push(new am4charts.ColumnSeries());
femaleSeries.dataFields.valueX = "female";
femaleSeries.dataFields.valueXShow = "percent";
femaleSeries.calculatePercent = true;
femaleSeries.fill = femaleChart.colors.getIndex(9);
femaleSeries.stroke = femaleSeries.fill;
femaleSeries.sequencedInterpolation = true;
femaleSeries.columns.template.tooltipText = "Females, age{categoryY}: {valueX} ({valueX.percent.formatNumber('#.0')}%)";
femaleSeries.dataFields.categoryY = "age";
femaleSeries.interpolationDuration = 1000;

//mainContainer.colors = am4core.color("#ff2a26");

// mainContainer.colors.list = [
//   am4core.color("#ff2a26"),
//   am4core.color("#FFCCCB"),
  
//   //am4core.color("#FFCCCB"),
  
// ];


  chartRef.current = mainContainer; // Assign both chart objects to chartRef.current
  
    return () => {
      
      mainContainer.dispose();
    };
}, [m65,f65,m60,f60,m55,f55,m50,f50,m45,f45,m40,f40,m35,f35,m30,f30,m25,f25,m20,f20,m15,f15,m10,f10,m5,f5,m0,f0]);
// Clean up the chart when the component unmounts

// useEffect(() => {
//   if (chartRef.current) {
//      // Update the chart with new data
//      //const { maleChart, femaleChart } = chartRef.current; // Destructure the chart objects from chartRef.current

//     // Update the chart with new data
//     chartRef.current.data = [
//       {
//         "age": "0 to 5",
//         "male": m0,
//         "female": f0
//       },
//       {
//         "age": "5 to 9",
//         "male": m5,
//         "female": f5
//       },
//       {
//         "age": "10 to 14",
//         "male": m10,
//         "female": f10
//       },
//       {
//         "age": "15 to 19",
//         "male": m15,
//         "female": f15
//       },
//       {
//         "age": "20 to 24",
//         "male": m20,
//         "female": f20
//       },
//       {
//         "age": "25 to 29",
//         "male": m25,
//         "female": f25
//       },
//       {
//         "age": "30 to 34",
//         "male": m30,
//         "female": f30
//       },
//       {
//         "age": "35 to 39",
//         "male": m35,
//         "female": f35
//       },
//       {
//         "age": "40 to 44",
//         "male": m40,
//         "female": f40
//       },
//       {
//         "age": "45 to 49",
//         "male": m45,
//         "female": f45
//       },
//       {
//         "age": "50 to 54",
//         "male": m50,
//         "female": f50
//       },
//       {
//         "age": "55 to 59",
//         "male": m55,
//         "female": f55
//       },
//       {
//         "age": "65 and Older",
//         "male": m65,
//         "female": f65  }
//     ];
//     chartRef.current.invalidateData();
//   }
// }, [m65,f65,m55,f55,m50,f50,m45,f45,m40,f40,m35,f35,m30,f30,m25,f25,m20,f20,m15,f15,m10,f10,m5,f5,m0,f0]);


  
return <div id={chartTypeNoDesc} style={{ width: '100%', height: '350px' }} />;

};

export default PopulationPyramidChart;
