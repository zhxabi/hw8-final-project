import { ExpenseObj } from "../../features/expenses/expenseSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ShareExpense from "./shareExpense";

export default function ExpenseItem({ expense, username}: { expense: ExpenseObj, username: String }) {
  const navigate = useNavigate();
  const [isEditBtn, setEditBtn] = useState(false);
  const [isDeleteBtn, setDeleteBtn] = useState(false);
  const [isShareBtn, setShareBtn] = useState(false);
  const [isSubmitBtn, setSubmitBtn] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState(String(expense.expenseAmount));
  const [sharedUsers, setSharedUsers] = useState(expense.sharedUsers);
  const [sharedAmount, setSharedAmount] = useState(expense.sharedAmount);
  const [owner, setOwner] = useState(expense.owner);
  const [comment, setComment] = useState(expense.comment? expense.comment:"");


  useEffect(() => {
    if(isSubmitBtn){
      axios.put(`api/expenses/${expense._id}`, 
      {
        expenseAmount: expenseAmount,
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
      setEditBtn(false)

    } else if (isDeleteBtn) {
      axios.delete(`api/expenses/${expense._id}`)
      .then(function (response: any) {
        console.log(response);
        navigate(0);
      })
      .catch(function (error: any) {
        console.log(error);
      });
      setDeleteBtn(false)
    }
  }, [expenseAmount, comment, isSubmitBtn, isEditBtn, isDeleteBtn]);

  return(
  <div className="max-w-lg mx-auto rounded shadow-lg px-4 py-4 my-2">

      <form className="mx-auto">
        <div className='flex flex-row my-2'>
          <div className='flex flex-col grow'>
            <div className='flex flex-row'>
            <div className='text-xl flex font-bold'>Total: $ </div>
            <input
              readOnly={!isEditBtn} 
              type="text"
              value={isEditBtn? expenseAmount : Number(expenseAmount).toFixed(2)}
              onChange={(e) => setExpenseAmount(e.target.value)}
              placeholder="Amount"
              className='text-xl flex font-bold bg-gray-100 read-only:bg-white'
            />
            </div>
            {Number(expenseAmount) === sharedAmount ? <></>  : 
            <div className='text-xl flex font-bold  text-teal-600 grow'>Each:     ${sharedAmount}</div>
            }
            

            <input
              readOnly={!isEditBtn} 
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add Comment Here"
              className='w-full my-2 text-lg bg-gray-100 read-only:bg-white'
            />
          </div>

          <div className='flex flex-col w-1/4 justify-end text-teal-600 '>
            <div className='flex justify-end'>
            {(owner === username) ? owner : "shared by " + owner}
            </div>
            {sharedUsers.map((usr) => ( <div className='flex justify-end text-amber-500'>{usr}</div>))}
          </div>
          

        </div>
        <p className='text-sm flex text-gray-400 my-1'> {new Date(expense.createdAt).toLocaleString()}  </p>
        {isEditBtn ? 
        <div>
          
          <button 
          type="button" 
          onClick={() => setSubmitBtn(true)} 
          className='w-sm text-white font-bold my-1 py-1 px-2 rounded bg-teal-400 hover:bg-teal-300'
          >
          Submit
          </button>
        </div>
        : 
        <div>
          <div>
            <button 
              type="button" 
              onClick={() => setEditBtn(true)} 
              className='w-sm text-white font-bold mx-1 my-1 py-1 px-2 rounded bg-teal-400 hover:bg-teal-300'
              >
              Edit
            </button>
            <button 
              type="button" 
              onClick={() => setShareBtn(true)} 
              className='w-sm text-white font-bold mx-1 my-1 py-1 px-2 rounded bg-amber-400 hover:bg-amber-300'
            >
              Share
            </button>
            <button 
              type="button" 
              onClick={() => setDeleteBtn(true)} 
              className='w-sm text-white font-bold mx-1 my-1 py-1 px-2 rounded bg-red-400 hover:bg-red-300'
            >
            Delete
            </button>
            {isShareBtn ? 
            <ShareExpense expense={expense} cancelFunc={setShareBtn} />
            : <></>}
          </div>
          <div>

          </div>
        </div>
        }
        
      </form>

     
    </div>  
    )
}