import { ExpenseObj } from "../features/expenses/expenseSlice";
import ExpenseItem from "./expenseItem";
import { useEffect, useState } from "react";
import NewExpense from "./newExpense";

export default function InsightPage({ expenses }: { expenses : ExpenseObj[] }) {

  return(
    <div className="flex flex-col w-1/2">
      <div className="flex flex-row">
        <p className='text-2xl font-bold mx-3 px-3'> Insights</p>
      </div>
    </div>
    )
}