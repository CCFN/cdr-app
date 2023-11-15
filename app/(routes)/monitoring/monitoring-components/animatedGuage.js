import React, { useEffect, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

const AnimatedGuage = ({ yield_value }) => {
  useEffect(() => {
    // Create chart
    let chart = am4core.create("chartdiv", am4charts.GaugeChart);
    chart.innerRadius = am4core.percent(82);

    // Axis for ranges
    let colorSet = new am4core.ColorSet();

    let axis2 = chart.xAxes.push(new am4charts.ValueAxis());
    axis2.min = 0;
    axis2.max = 100;
    axis2.strictMinMax = true;
    axis2.renderer.labels.template.disabled = true;
    axis2.renderer.ticks.template.disabled = true;
    axis2.renderer.grid.template.disabled = true;

    let range0 = axis2.axisRanges.create();
    range0.value = 0;
    range0.endValue = 50;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = colorSet.getIndex(0);

    let range1 = axis2.axisRanges.create();
    range1.value = 50;
    range1.endValue = 100;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = colorSet.getIndex(2);

    // Label
    let label = chart.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.fontSize = 30;
    label.x = am4core.percent(50);
    label.y = am4core.percent(100);
    label.horizontalCenter = "middle";
    label.verticalCenter = "bottom";
    label.text = `${yield_value}%`;

    // Hand
    let hand = chart.hands.push(new am4charts.ClockHand());
    // hand.axis = axis2;
    // hand.innerRadius = am4core.percent(20);
    // hand.startWidth = 10;
    // hand.pin.disabled = true;
    // hand.value = "69";
    
    hand.events.on("propertychanged", function(ev) {
        let staticValue = yield_value; // Change this to the desired static value
      
        range0.endValue = staticValue;
        range1.value = staticValue;
        label.text = axis2.positionToValue(hand.currentPosition).toFixed(1);
        axis2.invalidate();
      });
      
      setInterval(function() {
        let staticValue = yield_value; // Change this to the desired static value
        let animation = new am4core.Animation(hand, {
          property: "value",
          to: staticValue
        }, 1000, am4core.ease.cubicOut).start();
      }, 2000);

    return () => {
      chart.dispose();
    };
  }, [yield_value]);

  return <div id="chartdiv" style={{ width: '100%', height: '350px' }} />;
};

export default AnimatedGuage;
