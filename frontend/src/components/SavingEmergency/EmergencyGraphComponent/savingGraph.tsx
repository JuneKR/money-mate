import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, ChartData, ChartOptions, PointElement, LineElement} from 'chart.js';
Chart.register(LinearScale,CategoryScale, PointElement, LineElement);

interface SavingGraphProps {
    title: string;
}

const SavingGraph: React.FC<SavingGraphProps> = (props) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
      if (chartRef.current) {
          const chartInstance = (chartRef.current as any).chartInstance;
        if (chartInstance) {
          chartInstance.destroy();
        }
      }
    });
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: "Emergency",
          data: [0,5,10,15,20,25,30,35,40,45,50,55],
          fill: true,
          borderColor: "#FF6384",
          backgroundColor: "#FF6384",
          tension: 0.1,
        },
        {
          label: "เที่ยวญี่ปุ่น",
          data: [0,5,15,25,35,45,55,65,75,85,95,105],
          fill: true,
          backgroundColor: "#F47458",
          borderColor: "#F47458",
          tension: 0.1,
          // tension: 0.1,
        },
        {
          label: "Retirement",
          data: [0,5,15,25,45,65,85,105,125,145,165,185],
          fill: true,
          backgroundColor: "#36A2EB",
          borderColor: "#36A2EB",
          tension: 0.1,
          // tension: 0.1,
        }
      ]
    };
    const options = {
      scales: {
        y:{
            beginAtZero: true,
          },
        },  
      responsive: true,
      maintainAspectRatio: false	// Don't maintain w/h ratio
    };
    return (
      <div>
        <div className="">
          <div><Line data={data} options={options}/></div>
        </div>
      </div>
    );
};

export default SavingGraph;