import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

am4core.options.autoDispose = true;

const DonutWithRadialGradient = ({ chartTypeNumber }) => {
  const chartTypeNoDesc = `chartDiv${chartTypeNumber}`;

  useEffect(() => {
    const chart = am4core.create(chartTypeNoDesc, am4charts.PieChart);

    // Add data
    chart.data = [
      {
        indicator: 'Pregnant',
        indicatorValues: 501.9,
      },
      {
        indicator: 'Breast-Feeding',
        indicatorValues: 301.9,
      },
    ];

    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'indicatorValues';
    pieSeries.dataFields.category = 'indicator';
    pieSeries.innerRadius = am4core.percent(50);
    pieSeries.ticks.template.disabled = true;
    pieSeries.labels.template.disabled = true;

    const rgm = new am4core.RadialGradientModifier();
    rgm.brightnesses.push(-0.8, -0.6, -0.4, 0, -0.4); // Adjust brightness values
    pieSeries.slices.template.fillModifier = rgm;
    pieSeries.slices.template.strokeModifier = rgm;
    pieSeries.slices.template.strokeOpacity = 0.4;
    pieSeries.slices.template.strokeWidth = 0;

    // Set colors for slices
    pieSeries.colors.list = [
        am4core.color('#8B0000'), // Dark Red (wine color)
        am4core.color('#FF6B6B'), // Light Red (lighter wine color)
    ];

    chart.legend = new am4charts.Legend();
    chart.legend.position = 'right';

    // Clean up the chart when the component unmounts
    return () => {
      chart.dispose();
    };
  }, []);

  return <div id={chartTypeNoDesc} style={{ width: '100%', height: '350px' }} />;
};

export default DonutWithRadialGradient;
