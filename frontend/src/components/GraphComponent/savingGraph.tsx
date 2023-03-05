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
      labels: ['Red', 'Green', 'Yellow', 'blue', 'dark', 'test', 'test2'],
      datasets: [
        {
          label: "My Line chart 1",
          data: [1,2,3,4,3,2,7],
          fill: true,
          borderColor: "#742774",
          backgroundColor: "rgba(75,192,192,0.2)",
          tension: 0.1,
        },
        {
          label: "My Line chart 2",
          data: [1,10,3,4,5,6,7],
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
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