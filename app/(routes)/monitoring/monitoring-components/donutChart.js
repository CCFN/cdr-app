import React, { useEffect, useRef } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

const DonutChart = ({ unsuppressed, llv, undetectable, chartTypeNumber }) => {
  const chartTypeNoDesc = "chartDiv" + chartTypeNumber;
  const chartRef = useRef(null);

  useEffect(() => {
    // Create chart instance
let chart = am4core.create(chartTypeNoDesc, am4charts.PieChart);

// Add data
chart.data = [ {
  "indicator": "Un-Suppressed",
  "indicatorvalue": {unsuppressed}
}, {
  "indicator": "Low-Level Viremia",
  "indicatorvalue": {llv}
}, {
  "indicator": "Undetectable",
  "indicatorvalue": {undetectable}
},  ];

// Set inner radius
chart.innerRadius = am4core.percent(50);

// Add and configure Series
let pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "indicatorvalue";
pieSeries.dataFields.category = "indicator";
pieSeries.slices.template.stroke = am4core.color("#ff2a26");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;

// This creates initial animation
pieSeries.hiddenState.properties.opacity = 1;
pieSeries.hiddenState.properties.endAngle = -90;
pieSeries.hiddenState.properties.startAngle = -90;
    

chartRef.current = chart

pieSeries.colors.list = [
  am4core.color("#ff2a26"),
  am4core.color("#ff9526"),
  am4core.color("#FFCCCB"),
  // am4core.color("#845EC2"),
  // am4core.color("#D65DB1"),
  // am4core.color("#FF6F91"),
  // am4core.color("#FF9671"),
  // am4core.color("#FFC75F"),
  // am4core.color("#F9F871"),
];


    return () => {
      chart.dispose();
    };
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      // Update the chart with new data
      chartRef.current.data = [ {
        "indicator": "Un-Suppressed",
        "indicatorvalue": unsuppressed
      }, {
        "indicator": "Low-Level Viremia",
        "indicatorvalue": llv
      }, {
        "indicator": "Undetectable",
        "indicatorvalue": undetectable
      },  ];
      
      chartRef.current.invalidateData();
    }
  }, [ unsuppressed, llv, undetectable]);

  return <div id={chartTypeNoDesc} style={{ width: '100%', height: '350px' }} />;
};

export default DonutChart;
