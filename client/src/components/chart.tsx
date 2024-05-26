import React from 'react';
import { Chart } from 'react-google-charts';

const BarChartComponent: React.FC<any> = ({data}) => {
 
  
console.log(data,"this is my data");

  const options = {
    title: "User Data for Last 30 Days",
    vAxis: {
      title: "Count",
      titleTextStyle: {
        color: "white",
      },
      textStyle: {
        color: "white",
      },
    },
    hAxis: {
      title: "Month",
      titleTextStyle: {
        color: "white",
      },
      textStyle: {
        color: "white",
      },
    },
    titleTextStyle: {
      color: "white",
    },
    legend: {
      textStyle: {
        color: "white",
      },
    },
    seriesType: "bars",
    // series: { 2: { type: "line" } },
    
    backgroundColor: "",
  };
  return (
    <div className='  p-10 shadow-xl rounded-lg border border-gray-500'>
    <Chart
      width={'100%'}
      height={'500px'}
      chartType="ComboChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={options}
    /> </div>
  );
};

export default BarChartComponent;
