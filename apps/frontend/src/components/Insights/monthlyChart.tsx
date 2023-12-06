import { ExpenseObj, MonthlySumObj } from "../../features/expenses/expenseSlice";
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


export default function MonthlyChart({monthly}:{monthly:MonthlySumObj[]}) {
  const [res, setRes] = useState<MonthlySumObj[]>([])
  const [chartData, setChartData] = useState({
    labels: monthly.map((exp) => exp.date), 
    datasets: [
      {
        label: "monthly",
        data: monthly.map((exp) => exp.dayTotal),
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2
      }
    ]
  });


  useEffect(() => {
    // axios.get('api/expenses/monthly')
    // .then(function (response: any) {
    //   console.log(response.data);
    //   setRes(response.data);
    // })
    // .catch(function (error: any) {
    //   console.log(error);
    // });

    const fetchData = async () => {
      const labs : String[] = [];
      const amnts : Number[] = [];
      await axios.get('api/expenses/monthly')
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