
//import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import React, { useEffect, useRef } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
//import am4themes_animated from '@amcharts/amcharts4/themes/animated';

//am4core.useTheme(am4themes_animated);
am4core.options.autoDispose = true;
const ThreeDPieChart = ({txCurrAbia,txCurrEnugu,txCurrImo,capturedAbia,capturedEnugu,capturedImo,reCapturedAbia,reCapturedEnugu,reCapturedImo,chartTypeNumber}) => {
    const chartTypeNoDesc = "chartDiv"+ chartTypeNumber;
    useEffect(() => {
     // Set the amCharts theme
     //am4themes_animated.use();
   /* Chart code */
   // Themes begin
    //am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
let chart = am4core.create(chartTypeNoDesc, am4charts.PieChart3D);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.legend = new am4charts.Legend();

chart.data = [
  {
    country: "Pre Natal",
    litres: 501.9
  },
  {
    country: "Peri Natal",
    litres: 301.9
  },
  {
    country: "Post Partum",
    litres: 201.1
  }
];

let series = chart.series.push(new am4charts.PieSeries3D());
series.dataFields.value = "litres";
series.dataFields.category = "country";

    // Set colors for slices
    series.colors.list = [
      am4core.color('#8B0000'), // Dark Red (wine color)
      am4core.color('#FF6B6B'), // Light Red (lighter wine color)
      am4core.color('#FFE6E6'), // Blending Color (lightest wine color)
    ];

    // Clean up the chart when the component unmountsfunction
  //  return function componentWillUnmount() {
  //     if (this.chart) {
  //       this.chart.dispose();
        
  //     }
  //   };
  
    return () => {
      
      chart.dispose();
    };
}, []);
// Clean up the chart when the component unmounts


  
return <div id={chartTypeNoDesc} style={{ width: '100%', height: '350px' }} />;

};

export default ThreeDPieChart;
