import { ExpenseObj, MonthlySumObj } from "../types/expenseTypes.d";
import ExpenseItem from "../Expenses/expenseItem";
import { useEffect, useState } from "react";
import NewExpense from "../Expenses/newExpense";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  // responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Spending by Day',
    },
  },
  animation: {
    duration: 500
  },
  scales: {
    y: {
      suggestedMin: 0,
    }
  }
};


export default function MonthlyChart() {
  const [chartData, setChartData] = useState({
    labels: [] as String[], 
    datasets: [
      {
        label: "monthly",
        data: [0],
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2
      }
    ]
  });

  useEffect(() => {

    const fetchData = async () => {
      const labs : String[] = [];
      const amnts : number[] = [];
      await axios.get('api/expenses/stats/monthly')
      .then(function (response: any) {
        
        for ( let dataObj of response.data ) {
          labs.push(dataObj.date);
          amnts.push(dataObj.dayTotal);
        }
      })
      .catch(function (error: any) {
        console.log(error);
      });
      setChartData({
        labels: labs, 
        datasets: [
          {
            label: "monthly",
            data: amnts,
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2
          }
        ]
      })
    }

    fetchData();
  }, [])



  return(
    <div className="mx-3 px-3">
      <Line
        redraw={true}
        data={chartData}
        options={options}
      />
      </div>
    )
}