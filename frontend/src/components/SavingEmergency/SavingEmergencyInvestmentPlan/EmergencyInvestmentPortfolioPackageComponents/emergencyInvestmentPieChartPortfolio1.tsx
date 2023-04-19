import React, { useRef, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';
import tinycolor from 'tinycolor2';
Chart.register(ArcElement, Tooltip);

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
  }, []);

  const getRandomColor = (tone: string) => {
    const randomSaturation = Math.floor(Math.random() * 20);
    const randomLightness = Math.floor(Math.random() * 20);
    const randomColor = tinycolor(tone).saturate(randomSaturation).lighten(randomLightness);
    return randomColor.toHexString();
  };
  
  const data = {
    labels: Array.from(investmentPortfolioAllocation)?.map((item) => item.FundAbbrName),
    datasets: [
      {
        data: Array.from(investmentPortfolioAllocation)?.map((item) => item.AllocationRatio),
        backgroundColor: Array.from(investmentPortfolioAllocation)?.map(() => getRandomColor("#6259E8")),
        hoverBackgroundColor: Array.from(investmentPortfolioAllocation)?.map(() => getRandomColor("#1D1D41")),
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      tooltip: {
        intersect: true,
      },
    },
  };

  return (
    <div>
      {/* <h3>{title}</h3> */}
      <Pie
        ref={chartRef}
        data={data}
        options={options}
      />
    </div>
  );
};

export default EmergencyInvestmentPieChartPortfolio1;
