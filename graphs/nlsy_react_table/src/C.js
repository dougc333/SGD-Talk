import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

import { faker } from '@faker-js/faker';
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const make_data = ()=>{
    return Array.from({ length: 100 }, () => ({
        x: faker.datatype.number({ min: -100, max: 100 }),
        y: faker.datatype.number({ min: -100, max: 100 }),
      }))
}

console.log(make_data())


const data1 = [
    {x: 760.0, y: 6663.0}, 
    {x: 951.0, y: 6592.0}, 
    {x: 1026.0,y: 6437.0}, 
    {x: 1074.0,y: 6464.0}, 
    {x: 1298.0,y: 6543.0}, 
    {x: 1505.0,y: 5903.0}, 
    {x: 1543.0,y: 3006.0}
]
console.log(data1)

export const data = {
  datasets: [
    {
      label: 'A dataset',
      data: data1,
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
  ],
};

export function C() {
  return <Scatter options={options} data={data} />;
}
