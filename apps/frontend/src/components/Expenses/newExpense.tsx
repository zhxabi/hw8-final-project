import { ExpenseObj } from "../types/expenseTypes.d";
import ExpenseItem from "./expenseItem";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function NewExpense({ cancelFunc}: { cancelFunc : Function }) {
  const navigate = useNavigate();
  const [isCancelBtn, setCancelBtn] = useState(false);
  const [isSubmitBtn, setSubmitBtn] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState("");
  const [comment, setComment] = useState("");


  useEffect(() => {
    if(isSubmitBtn){
      axios.post('api/expenses/add', 
      {
        expenseAmount: Number(expenseAmount),
        comment: comment,
      }, 
      )
      .then(function (response: any) {
        console.log(response);
        navigate(0);
      })
      .catch(function (error: any) {
        console.log(error);
      });
      setSubmitBtn(false)

    } 
  }, [expenseAmount, comment, isSubmitBtn]);

  return(
  <div className="max-w-lg mx-auto rounded shadow-lg mx-4 px-4 py-4 my-2">

      <form className="">
        <div className='flex flex-row my-2'>
          <p className='text-xl flex font-bold'>$  </p>
          <input
            type="text"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            placeholder="0.00"
            className='text-xl flex font-bold bg-gray-100 read-only:bg-white'
            required
          />
        </div>
        <div className='flex flex-row'>
          <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add Comment Here"
              className='w-full my-2 text-lg bg-gray-100 read-only:bg-white'
            />
        </div>

        <div>
          <button 
            type="button" 
            onClick={() => setSubmitBtn(true)} 
            className='w-sm text-white font-bold mx-1 my-1 py-1 px-2 rounded bg-teal-400 hover:bg-teal-300'
            >
            Create
          </button>
          <button 
            type="button" 
            onClick={() => cancelFunc(false)} 
            className='w-sm text-white font-bold mx-1 my-1 py-1 px-2 rounded bg-red-400 hover:bg-red-300'
          >
          Cancel
          </button>
        </div>
        
      </form>

    </div>  
  );
}