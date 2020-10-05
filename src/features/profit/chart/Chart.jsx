import React from "react";
// import './App.css';

import { XYPlot, VerticalBarSeries, XAxis, YAxis } from "react-vis";

export default function Chart() {
    const data =[];

const appDates = [150,200,300,19,34,65,78,99,100,10,500,430,12,13,14,15,16,17,18,19,20,1,2,3,4,5,6,7,8,9,100,200,300,400,500];
let x = 0;

appDates.map(date => data.push({x: x++ , y: date}))
console.log(data);

  return (
    <XYPlot height={300} width={300}>
        <VerticalBarSeries
   data={data}
  />
  <XAxis />
  <YAxis />
    </XYPlot>
  );
}
