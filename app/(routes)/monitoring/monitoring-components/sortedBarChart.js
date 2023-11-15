
//import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import React, { useEffect, useRef } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
//import am4themes_animated from '@amcharts/amcharts4/themes/animated';

//am4core.useTheme(am4themes_animated);
am4core.options.autoDispose = true;
const SortedBarChart = ({pip,sti,mal,indCom,indFac,inPat,tb,anc,opd,chartTypeNumber}) => {
  const chartTypeNoDesc = "chartDiv"+ chartTypeNumber;
  useEffect(() => {
     // Set the amCharts theme
     //am4themes_animated.use();
   /* Chart code */
   // Themes begin
    //am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance

let chart = am4core.create(chartTypeNoDesc, am4charts.XYChart);
chart.padding(40, 40, 40, 40);

let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.dataFields.category = "stream";
categoryAxis.renderer.minGridDistance = 1;
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.grid.template.disabled = true;

let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;

let series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.categoryY = "stream";
series.dataFields.valueX = "streamvalues";
series.tooltipText = "{valueX.value}"
series.columns.template.strokeOpacity = 0;
series.columns.template.column.cornerRadiusBottomRight = 5;
series.columns.template.column.cornerRadiusTopRight = 5;

let labelBullet = series.bullets.push(new am4charts.LabelBullet())
labelBullet.label.horizontalCenter = "left";
labelBullet.label.dx = 10;
labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
labelBullet.locationX = 1;

// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
series.columns.template.adapter.add("fill", function(fill, target){
  return chart.colors.getIndex(target.dataItem.index);
});

categoryAxis.sortBySeries = series;
chart.data = [
    {
      "stream": "PEDIATRICS-IN-PATIENT",
      "streamvalues": pip
    },
    {
      "stream": "STI",
      "streamvalues": sti
    },
    {
      "stream": "MALNUTRITION",
      "streamvalues": mal
    },
    {
      "stream": "INDEX-COMMUNITY",
      "streamvalues": indCom
    },
    {
      "stream": "INDEX-FACILITY",
      "streamvalues": indFac
    },
    {
      "stream": "IN-PATIENT",
      "streamvalues": inPat
    },
    {
      "stream": "TB",
      "streamvalues": tb
    },
    {
      "stream": "ANC",
      "streamvalues": anc
    },
    {
      "stream": "OPD",
      "streamvalues": opd
    }
  ]
  chart.colors.list = [
    am4core.color("#ff2a26"),
    
    am4core.color("#ff5d26"),
    am4core.color("#ff5853"),
    am4core.color("#ff876f"),
    

    am4core.color("#ff9526"),
    am4core.color("#ff9526"),
    am4core.color("#ffb38c"),
    am4core.color("#ffb38c"),
    am4core.color("#ffd1aa"),
    
    


    //am4core.color("#FFCCCB"),
    
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

export default SortedBarChart;
