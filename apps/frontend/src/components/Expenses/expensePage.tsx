import { ExpenseObj } from "../../features/expenses/expenseSlice";
import ExpenseItem from "./expenseItem";
import { useEffect, useState } from "react";
import NewExpense from "./newExpense";
import axios from "axios";

export default function ExpensePage({ expenses }: { expenses : ExpenseObj[] }) {
  const [isNewBtn, setNewBtn] = useState(false);
  const [usrName, setUsrName] = useState("");
  const [cats, setCats] = useState([]);

  useEffect(() => {
    axios.get('api/username')
      .then(function (response: any) {
        // console.log(response.data);
        setUsrName(response.data);
      })
      .catch(function (error: any) {
        console.log(error);
      });

      axios.get('api/expenses/categories')
      .then(function (response: any) {
        // console.log(response.data);
        setCats(response.data.filter(function(e: any) {
            return e.category;
          }).map(function(e: { [x: string]: any; }) {
          return e['category'];
        })
        )
      })
      .catch(function (error: any) {
        console.log(error);
      });
      
      // console.log(cats);
      // axios.get('api/username')
      // .then(function (response: any) {
      //   // console.log(response.data);
      //   setUsrName(response.data);
      // })
      // .catch(function (error: any) {
      //   console.log(error);
      // });
  }, [])


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
      {expenses.map((exp, key) => {
          return (
            <div key={key}>
              <ExpenseItem expense={exp} username={usrName} cats={cats}/>
            </div>
          );  
      })}
      </div>
    )
}