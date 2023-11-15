
//import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import React, { useEffect, useRef } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
//import am4themes_animated from '@amcharts/amcharts4/themes/animated';

//am4core.useTheme(am4themes_animated);
am4core.options.autoDispose = true;
const StackedBarChart = ({m65,f65,m60,f60,m55,f55,m50,f50,m45,f45,m40,f40,m35,f35,m30,f30,m25,f25,m20,f20,m15,f15,m10,f10,m5,f5,m0,f0,chartTypeNumber}) => {
  const chartTypeNoDesc = "chartDiv"+ chartTypeNumber;
  const chartRef = useRef(null);

  useEffect(() => {
    

// Create chart instance
let chart = am4core.create(chartTypeNoDesc, am4charts.XYChart);

// Add data
chart.data = [{
  "age": "65+",
  "male": m65,
  "female": f65
}, {
  "age": "60-64",
  "male": m60,
  "female": f60
},{
  "age": "55-59",
  "male": m55,
  "female": f55
}, {
  "age": "50-54",
  "male": m50,
  "female": f50
}, {
  "age": "45-49",
  "male": m45,
  "female": f45
}, {
  "age": "40-44",
  "male": m40,
  "female": f40
}, {
  "age": "35-39",
  "male": m35,
  "female": f35
}, {
  "age": "30-34",
  "male": m30,
  "female": f30
}, {
  "age": "25-29",
  "male": m25,
  "female": f25
}, {
  "age": "20-24",
  "male": m20,
  "female": f20
}, {
  "age": "15-19",
  "male": m15,
  "female": f15
}, {
  "age": "10-14",
  "male": m10,
  "female": f10
}, {
  "age": "5-9",
  "male": m5,
  "female": f5
}, {
  "age": "0-4",
  "male": m0,
  "female": f0
}
];

// Use only absolute numbers
chart.numberFormatter.numberFormat = "#.#s";

// Create axes
let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "age";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.inversed = true;

let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.extraMin = 0.1;
valueAxis.extraMax = 0.1;
valueAxis.renderer.minGridDistance = 40;
valueAxis.renderer.ticks.template.length = 5;
valueAxis.renderer.ticks.template.disabled = false;
valueAxis.renderer.ticks.template.strokeOpacity = 0.4;
valueAxis.renderer.labels.template.adapter.add("text", function(text) {
  return text == "Male" || text == "Female" ? text : text + "";
})
chart.colors.list = [
  am4core.color("#ff2a26"),
  am4core.color("#FFCCCB"),
  
];

// pieSeries.colors.list = [
//   am4core.color("#845EC2"),
//   am4core.color("#D65DB1"),
//   am4core.color("#FF6F91"),
//   am4core.color("#FF9671"),
//   am4core.color("#FFC75F"),
//   am4core.color("#F9F871"),
// ];

// Create series
let male = chart.series.push(new am4charts.ColumnSeries());
male.dataFields.valueX = "male";
male.dataFields.categoryY = "age";
male.clustered = false;

let maleLabel = male.bullets.push(new am4charts.LabelBullet());
maleLabel.label.text = "{valueX}";
maleLabel.label.hideOversized = false;
maleLabel.label.truncate = false;
maleLabel.label.horizontalCenter = "right";
maleLabel.label.dx = -10;

let female = chart.series.push(new am4charts.ColumnSeries());
female.dataFields.valueX = "female";
female.dataFields.categoryY = "age";
female.clustered = false;

let femaleLabel = female.bullets.push(new am4charts.LabelBullet());
femaleLabel.label.text = "{valueX}";
femaleLabel.label.hideOversized = false;
femaleLabel.label.truncate = false;
femaleLabel.label.horizontalCenter = "left";
femaleLabel.label.dx = 10;

let maleRange = valueAxis.axisRanges.create();
maleRange.value = -10;
maleRange.endValue = 0;
maleRange.label.text = "Male";
maleRange.label.fill = "black";
maleRange.label.dy = 20;
maleRange.label.fontWeight = '600';
maleRange.grid.strokeOpacity = 1;
maleRange.grid.stroke = male.stroke;

let femaleRange = valueAxis.axisRanges.create();
femaleRange.value = 0;
femaleRange.endValue = 10;
femaleRange.label.text = "Female";
femaleRange.label.fill = "black";
femaleRange.label.dy = 20;
femaleRange.label.fontWeight = '600';
femaleRange.grid.strokeOpacity = 1;
femaleRange.grid.stroke = female.stroke;

chartRef.current = chart


  
    return () => {
      
      chart.dispose();
    };
}, []);
// Clean up the chart when the component unmounts
useEffect(() => {
  if (chartRef.current) {
    // Update the chart with new data
    chartRef.current.data = [{
      "age": "65+",
      "male": m65,
      "female": f65
    }, {
      "age": "55-59",
      "male": m55,
      "female": f55
    }, {
      "age": "50-54",
      "male": m50,
      "female": f50
    }, {
      "age": "45-49",
      "male": m45,
      "female": f45
    }, {
      "age": "40-44",
      "male": m40,
      "female": f40
    }, {
      "age": "35-39",
      "male": m35,
      "female": f35
    }, {
      "age": "30-34",
      "male": m30,
      "female": f30
    }, {
      "age": "25-29",
      "male": m25,
      "female": f25
    }, {
      "age": "20-24",
      "male": m20,
      "female": f20
    }, {
      "age": "15-19",
      "male": m15,
      "female": f15
    }, {
      "age": "10-14",
      "male": m10,
      "female": f10
    }, {
      "age": "5-9",
      "male": m5,
      "female": f5
    }, {
      "age": "0-4",
      "male": m0,
      "female": f0
    }
    ];
    chartRef.current.invalidateData();
  }
}, [m65,f65,m55,f55,m50,f50,m45,f45,m40,f40,m35,f35,m30,f30,m25,f25,m20,f20,m15,f15,m10,f10,m5,f5,m0,f0]);


  
return <div id={chartTypeNoDesc} style={{ width: '100%', height: '350px' }} />;

};

export default StackedBarChart;
