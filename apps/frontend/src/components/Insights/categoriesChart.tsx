import { ExpenseObj, MonthlySumObj } from "../types/expenseTypes.d";
import ExpenseItem from "../Expenses/expenseItem";
import { useEffect, useState } from "react";
import { Bar, Line, Pie, Doughnut} from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'

import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Colors
} from 'chart.js';
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

const options = {
  // responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    colors: {
      enabled: true,
      forceOverride: true,
    },
    title: {
      display: true,
      text: 'Spending by Category',
    },
  },
  animation: {
    duration: 500
  },
};

var randomColorGenerator = function () { 
  return '#' + (Math.random().toString(16) + '0000000').slice(2, 8); 
};




export default function CategoriesChart() {
  const [chartData, setChartData] = useState({
    labels: [] as String[], 
    datasets: [
      {
        label: "",
        data: [] as number[],
        // borderColor:  [] as string[],
        // backgroundColor: [] as string[],
        borderColor: 'rgb(255, 255, 255)', 
        // backgroundColor: randomColorGenerator,
        borderWidth: 2
      }
    ]
  });


  useEffect(() => {
    const fetchData = async () => {
      const labs : String[] = [];
      const amnts : number[] = [];
      await axios.get('api/expenses/stats/categories')
      .then(function (response: any) {
        for ( let dataObj of response.data ) {
          labs.push(dataObj.category ? dataObj.category : "Uncategorized");
          amnts.push(dataObj.total);
        }
      })
      .catch(function (error: any) {
        console.log(error);
      });
      setChartData({
        labels: labs, 
        datasets: [
          {
            label: "categories",
            data: amnts,
            // backgroundColor:  randomColorGenerator,
            borderColor: 'rgb(255, 255, 255)', 
            borderWidth: 2
          }
        ]
      })
    }

    fetchData();
  }, [])


  return(
    <div className="mx-3 px-3 my-3">
      <Doughnut
        redraw={true}
        data={chartData}
        options={options}
      />
      </div>
    )
}