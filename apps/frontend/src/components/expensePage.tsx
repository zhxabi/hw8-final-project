import { ExpenseObj } from "../features/expenses/expenseSlice";
import ExpenseItem from "./expenseItem";
import { useEffect, useState } from "react";
import NewExpense from "./newExpense";

export default function ExpensePage({ expenses }: { expenses : ExpenseObj[] }) {
  const [isNewBtn, setNewBtn] = useState(false);

  return(
    <div className="flex flex-col w-1/2">
      <div className="flex flex-row">
        <p className='text-2xl font-bold mx-3 px-3'> Expenses</p>
        <button 
          type="button" 
          onClick={() => setNewBtn(true)} 
          className='w-sm text-white font-bold my-1 py-1 px-2 rounded bg-teal-400 hover:bg-teal-300'
          >
          New
          </button>
      </div> 
      <div >
      {isNewBtn ? 
        <NewExpense cancelFunc={setNewBtn} /> : <></> }
      </div>
      {expenses.map((data, key) => {
          return (
            <div key={key}>
              <ExpenseItem expense={data} isEdit={false}/>
            </div>
          );  
      })}
      </div>
    )
}