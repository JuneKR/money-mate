import React, { useRef, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

interface EmergencyInvestmentPieChartPortfolio1Props {
    title: string;
    packageallocation: any;
}

const EmergencyInvestmentPieChartPortfolio1: React.FC<EmergencyInvestmentPieChartPortfolio1Props> = ({ title}) => {
    const chartRef = useRef(null);

    useEffect(() => {
      if (chartRef.current) {
          const chartInstance = (chartRef.current as any).chartInstance;
        if (chartInstance) {
          chartInstance.destroy();
        }
      }
    });

    const data = {
      labels: ['Red', 'Green', 'Yellow'],
      datasets: [
        {
          data: [60, 30, 10],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    };
    const options = {
      responsive: true,
      maintainAspectRatio: true,	// Don't maintain w/h ratio
      
    }
    return (
      <div><Pie ref={chartRef} data={data} options={options}/></div>
    );
};

export default EmergencyInvestmentPieChartPortfolio1;