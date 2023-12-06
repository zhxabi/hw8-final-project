import axios from "axios";
import { ExpenseObj, MonthlySumObj } from "../../features/expenses/expenseSlice";
import MonthlyChart from "./monthlyChart";
import { useEffect, useState } from "react";


export default function InsightPage() {
  const [res, setRes] = useState<MonthlySumObj[]>([])

  useEffect(() => {
    
    axios.get('api/expenses/monthly')
    .then(function (response: any) {
      console.log(response.data);
      setRes(response.data);
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
      <MonthlyChart monthly={res} />
    </div>
    )
}