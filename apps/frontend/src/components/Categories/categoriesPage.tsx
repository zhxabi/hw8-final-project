import { ExpenseObj } from "../types/expenseTypes.d";
import ExpenseItem from "../Expenses/expenseItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CategoriesPage() {
  const { catName } = useParams(); 

  const [usrName, setUsrName] = useState("");
  const [expenses, setExpenses] = useState<ExpenseObj[]>([]);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    
    axios.get(`http://localhost:5173/api/expenses/categories/${catName}`)
      .then(function (response: any) {
        console.log(response.data)
        setExpenses(response.data);
        
      })
      .catch(function (error: any) {
        console.log(error);
      });

    axios.get('http://localhost:5173/api/expenses/categories')
      .then(function (response: any) {
        console.log(response)
        setCats(response.data.filter(function(e: any) {
            return e.category;
          }).map(function(e: { [x: string]: any; }) {
          return e['category'];
        }))
      })
      .catch(function (error: any) {
        console.log(error);
      });

  }, [])


  return(
    <div className="flex flex-col w-1/2">
      <p className='text-2xl font-bold mx-3 px-3'> Category: {catName}</p>

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