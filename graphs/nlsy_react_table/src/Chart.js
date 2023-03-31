import React from 'react';
import ReactDOM from'react-dom';
import {Scatter} from 'react-chartjs-2'


export const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


const data = [
    {"MCS2000": 760.0, "PCS2000": 6663.0}, 
    {"MCS2000": 951.0, "PCS2000": 6592.0}, 
    {"MCS2000": 1026.0, "PCS2000": 6437.0}, 
    {"MCS2000": 1074.0, "PCS2000": 6464.0}, 
    {"MCS2000": 1298.0, "PCS2000": 6543.0}, 
    {"MCS2000": 1505.0, "PCS2000": 5903.0}, 
    {"MCS2000": 1543.0, "PCS2000": 3006.0}
]


export function Chart() {
    return <Scatter options={options} data={data} />;
  }