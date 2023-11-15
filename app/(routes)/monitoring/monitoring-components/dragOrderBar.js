import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

am4core.options.autoDispose = true;

const DragOrderBarChart = ({
  txCurrAbia,
  txCurrEnugu,
  txCurrImo,
  capturedAbia,
  capturedEnugu,
  capturedImo,
  reCapturedAbia,
  reCapturedEnugu,
  reCapturedImo,
  chartTypeNumber
}) => {
  const chartTypeNoDesc = "chartDiv" + chartTypeNumber;

  useEffect(() => {
    let chart = am4core.create(chartTypeNoDesc, am4charts.XYChart);

    let data = [
      {
        indicator: "UnSuppressed",
        indicatorValues: 501.9
      },
      {
        indicator: "LLV",
        indicatorValues: 301.9
      },
      {
        indicator: "Undectectable",
        indicatorValues: 271.1
      },
      {
        indicator: "Results Received",
        indicatorValues: 361.9
      },
      {
        indicator: "Samples Collected",
        indicatorValues: 271.1
      },
      {
        indicator: "VL_Eligible",
        indicatorValues: 271.1
      },
      {
        indicator: "PMTCT_ARV",
        indicatorValues: 271.1
      }
    ];

    chart.data = data;

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "indicator";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.interpolationDuration = 2000;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());

    function createSeries(field, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = "indicatorValues";
      series.dataFields.categoryY = "indicator";
      series.columns.template.tooltipText = "[bold]{valueX}[/]";
      series.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;

      series.columns.template.fill = am4core.color("#800020"); // Wine color blended with red
      series.columns.template.stroke = am4core.color("#550015"); // Suitable stroke color
      series.columns.template.strokeWidth = 2; // Set the stroke width

      let hs = series.columns.template.states.create("hover");
      hs.properties.fillOpacity = 0.7;

      let columnTemplate = series.columns.template;
      columnTemplate.maxX = 0;
      columnTemplate.draggable = true;

      columnTemplate.events.on("dragstart", function (ev) {
        let dataItem = ev.target.dataItem;

        let axislabelItem = categoryAxis.dataItemsByCategory.getKey(
          dataItem.categoryY
        )._label;
        axislabelItem.isMeasured = false;
        axislabelItem.minX = axislabelItem.pixelX;
        axislabelItem.maxX = axislabelItem.pixelX;

        axislabelItem.dragStart(
          ev.target.interactions.downPointers.getIndex(0)
        );
        axislabelItem.dragStart(ev.pointer);
      });

      columnTemplate.events.on("dragstop", function (ev) {
        let dataItem = ev.target.dataItem;
        let axislabelItem = categoryAxis.dataItemsByCategory.getKey(
          dataItem.categoryY
        )._label;
        axislabelItem.dragStop();
        handleDragStop(ev);
      });
    }
    createSeries("indicatorValues", "indicatorValues");

    function handleDragStop(ev) {
      data = [];
      chart.series.each(function (series) {
        if (series instanceof am4charts.ColumnSeries) {
          series.dataItems.values.sort(compare);

          let indexes = {};
          series.dataItems.each(function (seriesItem, index) {
            indexes[seriesItem.categoryY] = index;
          });

          categoryAxis.dataItems.values.sort(function (a, b) {
            let ai = indexes[a.category];
            let bi = indexes[b.category];
            if (ai == bi) {
              return 0;
            } else if (ai < bi) {
              return -1;
            } else {
              return 1;
            }
          });

          let i = 0;
          categoryAxis.dataItems.each(function (dataItem) {
            dataItem._index = i;
            i++;
          });

          categoryAxis.validateDataItems();
          series.validateDataItems();
        }
      });
    }

    function compare(a, b) {
      if (a.column.pixelY < b.column.pixelY) {
        return 1;
      }
      if (a.column.pixelY > b.column.pixelY) {
        return -1;
      }
      return 0;
    }

    return () => {
      chart.dispose();
    };
  }, []);

  return <div id={chartTypeNoDesc} style={{ width: '100%', height: '350px' }} />;
};

export default DragOrderBarChart;
