import axios from "axios";
import { ExpenseObj, MonthlySumObj } from "../../features/expenses/expenseSlice";
import MonthlyChart from "./monthlyChart";
import { useEffect, useState } from "react";
import FriendsChart from "./friendsChart";
import CategoriesChart from "./categoriesChart";


export default function InsightPage() {
  const [monthly, setMonthly] = useState<MonthlySumObj[]>([])

  useEffect(() => {
    
    axios.get('api/expenses/stats/monthly')
    .then(function (response: any) {
      console.log(response.data);
      setMonthly(response.data);
    })
    .catch(function (error: any) {
      console.log(error);
    });

    axios.get('api/expenses/stats/shared')
    .then(function (response: any) {
      console.log(response.data);
      // setRes(response.data);
    })
    .catch(function (error: any) {
      console.log(error);
    });

  }, [])

  return(
    <div className="flex flex-col w-1/2">
      <div className="flex flex-row">
        <p className='text-2xl font-bold mx-3 px-3'> Insights</p>
      </div>
      <MonthlyChart />
      <FriendsChart />
      <CategoriesChart />
    </div>
    )
}