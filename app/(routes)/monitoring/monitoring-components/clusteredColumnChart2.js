import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

am4core.options.autoDispose = true;

const ClusteredColumnChart2 = ({ chartTypeNumber }) => {
  const chartTypeNoDesc = "chartDiv" + chartTypeNumber;

  useEffect(() => {
    let chart = am4core.create(chartTypeNoDesc, am4charts.XYChart);
    chart.colors.list = [
        am4core.color('#8B0000'), // Dark Red (wine color)
        am4core.color('#FF6B6B'), // Light Red (lighter wine color)
        am4core.color('#FF6B6'), // Black color (Black Color)
    ];

    chart.legend = new am4charts.Legend();
    chart.legend.position = 'top';
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = 'category';
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.grid.template.location = 0;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = value;
      series.dataFields.categoryX = 'category';
      series.name = name;

      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);

      let bullet = series.bullets.push(new am4charts.LabelBullet());
      bullet.interactionsEnabled = false;
      bullet.dy = 30;
      bullet.label.text = '{valueY}';
      bullet.label.fill = am4core.color('#ffffff');

      return series;
    }

    chart.data = [
      {
        category: 'Abia',
        first: 100,
        second: 55,
        third: 60
      },
      {
        category: 'Enugu',
        first: 130,
        second: 78,
        third: 60
      },
      {
        category: 'Imo',
        first: 150,
        second: 40,
        third: 60
      }
    ];

    createSeries('first', 'Tx_Curr');
    createSeries('second', 'Captured');
    createSeries('third', 'Yet to Capture');

    function arrangeColumns() {
      // ... (same as in your original code)
    }

    // Clean up the chart when the component unmounts
    return () => {
      chart.dispose();
    };
  }, []);

  return <div id={chartTypeNoDesc} style={{ width: '100%', height: '350px' }} />;
};

export default ClusteredColumnChart2;
