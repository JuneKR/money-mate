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
  Legend,
  Filler
} from 'chart.js';
Chart.register(LinearScale, CategoryScale, PointElement, LineElement, Tooltip, Legend, Filler);

interface SRetirementSavingGraphProps {
  title: string;
  savingRetirement: any;
  savingInvestmentPort: any;
}

const SRetirementSavingGraph: React.FC<SRetirementSavingGraphProps> = React.forwardRef<HTMLCanvasElement, SRetirementSavingGraphProps>((props) => {
  const chartRef = useRef();
  const { savingRetirement, savingInvestmentPort } = props;
  console.log("savingRetirementPlanaaaaaaa", savingRetirement)
  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = (chartRef.current as any).chartInstance;
      if (chartInstance) {
        chartInstance.destroy();
      }
    }
  }, []);

  const tvmCalculator = require("tvm-calculator");
  const moment = require('moment-timezone');

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

  const bangkokTimezone = 'Asia/Bangkok';
  const investmentAmortizationSchedule = numberPeriods(savingRetirement.TotalBalance, savingRetirement.TargetAmount, savingRetirement.MonthlySaving,savingInvestmentPort.ReturnRate/100);
  const savingAmortizationSchedule = numberPeriods(savingRetirement.TotalBalance, savingRetirement.TargetAmount, savingRetirement.MonthlySaving, 0);
  console.log("investmentAmortizationSchedule", investmentAmortizationSchedule)
  console.log("savingAmortizationSchedule", savingAmortizationSchedule)
  const fvData = investmentAmortizationSchedule.map((period, index) => {
    const startDate = moment().tz(bangkokTimezone).add(index, 'months');
    const monthName = startDate.format('MMM');
    const year = startDate.format('YYYY');
    const monthYear = `${monthName} ${year}`;
    return {
      x: monthName,
      y: Number(period.fv).toFixed(2),
      z: monthYear
    }
  });

  const fvSavingData = savingAmortizationSchedule.map((period, index) => {
    const startDate = moment().tz(bangkokTimezone).add(index, 'months');
    const monthName = startDate.format('MMM');
    const year = startDate.format('YYYY');
    const monthYear = `${monthName} ${year}`;
    return {
      x: monthName,
      y: Number(period.fv).toFixed(2),
      z: monthYear
    }
  });

  console.log('FV Data', fvData);

  const data = {
    labels: fvData.map((value)=> value.z),
    datasets: [
      {
        label: "จำนวนเงินจากการออมเงิน",
        data: fvSavingData.map((value)=> value.y),
        fill: true,
        borderColor: "#7EFFB2",
        // backgroundColor: "#7EFFB2", -> rgba ref color
        backgroundColor: "rgba(126, 255, 178, 0.5)",
        tension: 0.1,
        pointRadius: 0
      },
      {
        label: "จำนวนเงินที่ได้จากการลงทุน",
        data: fvData.map((value)=> value.y),
        fill: true,
        borderColor: "#B796FF ",
        // backgroundColor: "#B796FF",
        backgroundColor: "rgba(183, 150, 255, 0.5)",
        tension: 0.1,
        pointRadius: 0
      },
    ]
  };

  const options: ChartOptions<"line"> = {
    plugins: {
      legend: {
        labels: {
          color: 'white'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
          maxTicksLimit: 6
        },
      },
      y: {
        ticks: {
          color: 'white'
        },
        position: 'right',
        beginAtZero: true
      }
    },
    backgroundColor: 'black'
  };  

  return (
    <div >
      <Line 
        data={data} 
        options={options} 
        ref={chartRef}   
      />
    </div>
  );
});

SRetirementSavingGraph.displayName = "SRetirementSavingGraph";

export default SRetirementSavingGraph;
