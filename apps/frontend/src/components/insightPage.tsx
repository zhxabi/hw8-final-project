import { ExpenseObj } from "../features/expenses/expenseSlice";
import ExpenseItem from "./expenseItem";
import { useEffect, useState } from "react";
import NewExpense from "./newExpense";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function InsightPage({ expenses }: { expenses : ExpenseObj[] }) {
  const [chartData, setChartData] = useState({
    labels: expenses.map((exp) => new Date(exp.createdAt).toLocaleDateString()), 
    datasets: [
      {
        label: "Test",
        data: expenses.map((exp) => exp.expenseAmount),
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2
      }
    ]
    
  });

  useEffect(() => {
    setChartData({
      labels: expenses.map((exp) => new Date(exp.createdAt).toLocaleDateString()), 
      datasets: [
        {
          label: "Test",
          data: expenses.map((exp) => exp.expenseAmount),
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 2
        }
      ]
    })

}, [chartData]);


  const [options, setOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Spending by Month',
      },
    },
    animation: {
      duration: 100
    }
  });


  return(
    <div className="flex flex-col w-1/2">
      <div className="flex flex-row">
        <p className='text-2xl font-bold mx-3 px-3'> Insights</p>
      </div>
      <Line
        data={chartData}
        options={options}
      />
    </div>
    )
}