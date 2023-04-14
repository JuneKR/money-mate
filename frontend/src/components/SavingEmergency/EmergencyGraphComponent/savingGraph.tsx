import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart, 
  LinearScale, 
  CategoryScale, 
  ChartData, 
  ChartOptions, 
  PointElement, 
  LineElement, 
  Tooltip,
  Legend
} from 'chart.js';
Chart.register(LinearScale, CategoryScale, PointElement, LineElement, Tooltip, Legend);

interface SavingGraphProps {
  title: string;
}

const SavingGraph: React.FC<SavingGraphProps> = React.forwardRef<HTMLCanvasElement, SavingGraphProps>((props, ref) => {
  const chartRef = useRef();

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = (chartRef.current as any).chartInstance;
      if (chartInstance) {
        chartInstance.destroy();
      }
    }
  });

  const tvmCalculator = require("tvm-calculator");

  function numberPeriods(
    pvInput: number,
    fvInput: number,
    pmInput: number,
    rateInput: number
  ) {
    const tvmResult = tvmCalculator.calcNPer({
      pv: -pvInput,
      fv: fvInput,
      pmt: -pmInput,
      rate: rateInput/12,
      compound: 'monthly'
    });
    const numPeriods = tvmResult;
    const payment = pmInput;
    const amortizationSchedule = [];

    let currentBalance = pvInput;

    for (let i = 1; i <= numPeriods && currentBalance < fvInput; i++) {
      const monthlyRate = rateInput / 12;
      const interestPayment = currentBalance * monthlyRate;
      const futureValue = currentBalance + payment + interestPayment

      const paymentDetails = {
        period: i,
        pv: currentBalance.toFixed(2),
        pmt: payment.toFixed(2),
        fv: futureValue.toFixed(2)
      };

      amortizationSchedule.push(paymentDetails);

      currentBalance = futureValue;
    }

    return amortizationSchedule;
  }

  const amortizationSchedule = numberPeriods(0, 60000,1000,0.0587);
  console.log('Amortization Schedule', amortizationSchedule)

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: "จำนวนเงินจากการออมเงิน",
        data: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
        fill: true,
        borderColor: "#FF6384",
        backgroundColor: "#FF6384",
        tension: 0.1,
      },
      {
        label: "จำนวนเงินที่ได้จากการลงทุน",
        data: [0, 5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105],
        fill: true,
        backgroundColor: "#F47458",
        borderColor: "#F47458",
        tension: 0.1,
      },
    ]
  };

  const options = {
  };

  return (
    <div>
      <Line 
        data={data} 
        options={options} 
        ref={chartRef}   
      />
    </div>
  );
});

export default SavingGraph;
