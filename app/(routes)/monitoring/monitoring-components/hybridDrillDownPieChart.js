import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

am4core.options.autoDispose = true;

const HybridDrillDownPieChart = ({
  Tx_cur,
  encounter,
  recapturedFingerPrints,
  reCapturedEncounters,
  chartTypeNumber
}) => {
  const chartTypeNoDesc = "chartDiv" + chartTypeNumber;

  useEffect(() => {
    let data = [
      {
        "category": "Abia",
        "value": 89,
        "color": am4core.color("#800020"), // Wine color
        "breakdown": [
          {
            "category": "Tx_Curr",
            "value": 29
          },
          {
            "category": "Clinical Encounters",
            "value": 40
          },
          {
            "category": "Re-Captured Prints",
            "value": 11
          },
          {
            "category": "Re-Captured Encounters",
            "value": 9
          }
        ]
      },
      {
        "category": "Enugu",
        "value": 71,
        "color": am4core.color("#FFCCCB"), // Blending color
        "breakdown": [
          {
            "category": "Tx_Curr",
            "value": 22
          },
          {
            "category": "Clinical Encounters",
            "value": 30
          },
          {
            "category": "Re-Captured Prints",
            "value": 11
          },
          {
            "category": "Re-Captured Encounters",
            "value": 10
          }
        ]
      },
      {
        "category": "Imo",
        "value": 120,
        "color": am4core.color("#000000"), // Black color
        "breakdown": [
          {
            "category": "Tx_Curr",
            "value": 60
          },
          {
            "category": "Clinical Encounters",
            "value": 35
          },
          {
            "category": "Re-Captured Prints",
            "value": 15
          },
          {
            "category": "Re-Captured Encounters",
            "value": 10
          }
        ]
      }
    ];

    let chart = am4core.create(chartTypeNoDesc, am4core.Container);
    chart.width = am4core.percent(100);
    chart.height = am4core.percent(100);
    chart.layout = "horizontal";

    let columnChart = chart.createChild(am4charts.XYChart);

    let categoryAxis = columnChart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;

    let valueAxis = columnChart.xAxes.push(new am4charts.ValueAxis());

    let columnSeries = columnChart.series.push(new am4charts.ColumnSeries());
    columnSeries.dataFields.valueX = "value";
    columnSeries.dataFields.categoryY = "category";
    columnSeries.columns.template.strokeWidth = 0;

    let pieChart = chart.createChild(am4charts.PieChart);
    pieChart.data = data;
    pieChart.innerRadius = am4core.percent(50);

    let pieSeries = pieChart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "category";
    pieSeries.slices.template.propertyFields.fill = "color";
    pieSeries.labels.template.disabled = true;

    let label1 = pieChart.seriesContainer.createChild(am4core.Label);
    label1.text = "";
    label1.horizontalCenter = "middle";
    label1.fontSize = 35;
    label1.fontWeight = 600;
    label1.dy = -30;

    let label2 = pieChart.seriesContainer.createChild(am4core.Label);
    label2.text = "";
    label2.horizontalCenter = "middle";
    label2.fontSize = 12;
    label2.dy = 20;

    pieChart.events.on("ready", function (ev) {
      pieSeries.slices.getIndex(0).isActive = true;
    });

    pieSeries.slices.template.events.on("toggled", function (ev) {
      if (ev.target.isActive) {
        pieSeries.slices.each(function (slice) {
          if (slice != ev.target) {
            slice.isActive = false;
          }
        });

        columnSeries.appeared = false;
        columnChart.data = ev.target.dataItem.dataContext.breakdown;
        columnSeries.fill = ev.target.fill;
        columnSeries.reinit();

        label1.text = pieChart.numberFormatter.format(
          ev.target.dataItem.values.value.percent,
          "#.'%'"
        );
        label1.fill = ev.target.fill;

        label2.text = ev.target.dataItem.category;
      }
    });

    return () => {
      chart.dispose();
    };
  }, []);

  return <div id={chartTypeNoDesc} style={{ width: '100%', height: '350px' }} />;
};

export default HybridDrillDownPieChart;
