import { ExpenseObj, MonthlySumObj } from "../types/expenseTypes.d";
import ExpenseItem from "../Expenses/expenseItem";
import { useEffect, useState } from "react";
import NewExpense from "../Expenses/newExpense";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import {
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
      text: 'Most Shared Users',
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


export default function FriendsChart() {
  const [chartData, setChartData] = useState({
    labels: [] as String[], 
    datasets: [
      {
        label: "monthly",
        data: [] as number[],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor:  'rgba(255, 159, 64, 0.2)',
        barPercentage: 0.6,
        borderWidth: 2
      }
    ]
  });


  useEffect(() => {
    const fetchData = async () => {
      const labs : String[] = [];
      const amnts : number[] = [];
      await axios.get('api/expenses/stats/shared')
      .then(function (response: any) {
        
        for ( let dataObj of response.data ) {
          if (dataObj.users) {
            labs.push(dataObj.users);
            amnts.push(dataObj.count);
          }
        }
      })
      .catch(function (error: any) {
        console.log(error);
      });
      setChartData({
        labels: labs, 
        datasets: [
          {
            label: "friends",
            data: amnts,
            borderColor: 'rgb(255, 159, 64)',
            backgroundColor:  'rgba(255, 159, 64, 0.2)',
            barPercentage: 0.5,
            borderWidth: 2
          }
        ]
      })
    }

    fetchData();
  }, [])


  return(
    <div className="mx-3 px-3">
      <Bar
        redraw={true}
        data={chartData}
        options={options}
      />
      </div>
    )
}