import React, { useEffect, useRef } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

const BarsWithMovingBullets = ({ unsuppressed, suppressed, results, samples, eligible, treatment, chartTypeNumber }) => {
  const chartTypeNoDesc = "chartDiv" + chartTypeNumber;
  const chartRef = useRef(null);

  useEffect(() => {
    let chart = am4core.create(chartTypeNoDesc, am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.paddingRight = 40;

chart.data = [{
    "name": "Treatment",
    "steps": {treatment},
    "href": "https://cdn.pixabay.com/photo/2013/07/13/11/44/capsule-158568_640.png"
}, {
    "name": "Eligible",
    "steps": {eligible},
    "href": "https://cdn.pixabay.com/photo/2013/07/13/12/06/aids-159170_640.png"
}, {
    "name": "Samples",
    "steps": {samples},
    "href": "https://cdn.pixabay.com/photo/2017/06/10/06/39/chemistry-2389151_640.png"
}, {
    "name": "Results",
    "steps": {results},
    "href": "https://cdn.pixabay.com/photo/2017/05/15/23/48/survey-2316468_640.png"
}, {
    "name": "Suppressed",
    "steps": {suppressed},
    "href": "https://cdn.pixabay.com/photo/2012/04/25/00/29/germ-41367_640.png"
},{
  "name": "Unsuppressed",
  "steps": {unsuppressed},
  "href": "https://images.unsplash.com/photo-1580377968211-b6425102326b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHZpcnVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
},
];

let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "name";
categoryAxis.renderer.grid.template.strokeOpacity = 0;
categoryAxis.renderer.minGridDistance = 10;
categoryAxis.renderer.labels.template.dx = -40;
categoryAxis.renderer.minWidth = 120;
categoryAxis.renderer.tooltip.dx = -40;

let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.inside = true;
valueAxis.renderer.labels.template.fillOpacity = 0.3;
valueAxis.renderer.grid.template.strokeOpacity = 0;
valueAxis.min = 0;
valueAxis.cursorTooltipEnabled = false;
valueAxis.renderer.baseGrid.strokeOpacity = 0;
valueAxis.renderer.labels.template.dy = 20;

let series = chart.series.push(new am4charts.ColumnSeries);
series.dataFields.valueX = "steps";
series.dataFields.categoryY = "name";
series.tooltipText = "{valueX.value}";
series.tooltip.pointerOrientation = "vertical";
series.tooltip.dy = - 30;
series.columnsContainer.zIndex = 100;

let columnTemplate = series.columns.template;
columnTemplate.height = am4core.percent(40);
columnTemplate.maxHeight = 40;
columnTemplate.column.cornerRadius(30, 10, 30, 10);
columnTemplate.strokeOpacity = 0;
series.heatRules.push({ target: columnTemplate, property: "fill", dataField: "valueX", min: am4core.color("#ff9526"), max: am4core.color("#FFCCCB") });

series.mainContainer.mask = undefined;

let cursor = new am4charts.XYCursor();
chart.cursor = cursor;
cursor.lineX.disabled = true;
cursor.lineY.disabled = true;
cursor.behavior = "none";

let bullet = columnTemplate.createChild(am4charts.CircleBullet);
bullet.circle.radius = 15;
bullet.valign = "middle";
bullet.align = "left";
bullet.isMeasured = true;
bullet.interactionsEnabled = false;
bullet.horizontalCenter = "right";
bullet.interactionsEnabled = false;

let hoverState = bullet.states.create("hover");
let outlineCircle = bullet.createChild(am4core.Circle);
outlineCircle.adapter.add("radius", function (radius, target) {
    let circleBullet = target.parent;
    return circleBullet.circle.pixelRadius + 10;
})

let image = bullet.createChild(am4core.Image);
image.width = 30;
image.height = 30;
image.horizontalCenter = "middle";
image.verticalCenter = "middle";
image.propertyFields.href = "href";

image.adapter.add("mask", function (mask, target) {
    let circleBullet = target.parent;
    return circleBullet.circle;
})

let previousBullet;
chart.cursor.events.on("cursorpositionchanged", function (event) {
    let dataItem = series.tooltipDataItem;

    if (dataItem.column) {
        let bullet = dataItem.column.children.getIndex(1);

        if (previousBullet && previousBullet.name !== bullet.name) {
          previousBullet.isHover = false;
        }

        if (previousBullet != bullet) {

            let hs = bullet.states.getKey("hover");
            hs.properties.dx = dataItem.column.pixelWidth;
            bullet.isHover = true;

            previousBullet = bullet;
        }
    }
});

chartRef.current = chart


    return () => {
      chart.dispose();
    };
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      // Update the chart with new data
      chartRef.current.data = [
        {
          "name": "Treatment",
          "steps": treatment,
          "href": "https://cdn.pixabay.com/photo/2013/07/13/11/44/capsule-158568_640.png"
        },
        {
          "name": "Eligible",
          "steps": eligible,
          "href": "https://cdn.pixabay.com/photo/2013/07/13/12/06/aids-159170_640.png"
        },
        {
          "name": "Samples",
          "steps": samples,
          "href": "https://cdn.pixabay.com/photo/2017/06/10/06/39/chemistry-2389151_640.png"
        },
        {
          "name": "Results",
          "steps": results,
          "href": "https://cdn.pixabay.com/photo/2017/05/15/23/48/survey-2316468_640.png"
        },
        {
          "name": "Suppressed",
          "steps": suppressed,
          "href": "https://cdn.pixabay.com/photo/2012/04/25/00/29/germ-41367_640.png"
        },
        {
          "name": "Unsuppressed",
          "steps": unsuppressed,
          "href": "https://images.unsplash.com/photo-1580377968211-b6425102326b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHZpcnVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
        }
      ];
      chartRef.current.invalidateData();
    }
  }, [unsuppressed, suppressed, results, samples, eligible, treatment]);

  return <div id={chartTypeNoDesc} style={{ width: '100%', height: '350px' }} />;
};

export default BarsWithMovingBullets;
