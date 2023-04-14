import React, { useRef, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import tinycolor from 'tinycolor2';
Chart.register(ArcElement);

interface PortfolioItem {
  Portfolio_ID: number;
  Fund_ID: number;
  PolicyDesc: string;
  FundAbbrName: string;
  OneYearReturns: number;
  AllocationRatio: number;
}

interface EmergencyInvestmentPieChartPortfolio1Props {
  title: string;
  investmentPortfolioAllocation: PortfolioItem[];
}

const EmergencyInvestmentPieChartPortfolio1: React.FC<EmergencyInvestmentPieChartPortfolio1Props> = (props) => {
  const { title, investmentPortfolioAllocation } = props;
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = (chartRef.current as any).chartInstance;
      if (chartInstance) {
        chartInstance.destroy();
      }
    }
  });

  const getRandomColor = (tone: string) => {
    const randomSaturation = Math.floor(Math.random() * 20);
    const randomLightness = Math.floor(Math.random() * 20);
    const randomColor = tinycolor(tone).saturate(randomSaturation).lighten(randomLightness);
    return randomColor.toHexString();
  };
  
  const data = {
    labels: investmentPortfolioAllocation.map((item) => item.FundAbbrName),
    datasets: [
      {
        data: investmentPortfolioAllocation.map((item) => item.AllocationRatio),
        backgroundColor: investmentPortfolioAllocation.map(() => getRandomColor("#6259E8")),
        hoverBackgroundColor: investmentPortfolioAllocation.map(() => getRandomColor("#1D1D41")),
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.labels[context.dataIndex];
            const value = context.dataset.data[context.dataIndex];
            return `${label}: ${value}`;
          }
        },
      },
    },
  };

  return (
    <div>
      <h3>{title}</h3>
      <Pie
        ref={chartRef}
        data={data}
        options={options}
      />
    </div>
  );
};

export default EmergencyInvestmentPieChartPortfolio1;
