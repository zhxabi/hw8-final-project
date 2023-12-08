import axios from "axios";
import { ExpenseObj, UserObj } from "../../features/expenses/expenseSlice";
import ExpenseItem from "./expenseItem";
import { useEffect, useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { MultiSelect, Option } from "react-multi-select-component";
import { useNavigate } from "react-router-dom";


export default function ShareExpense({ expense, cancelFunc }: { expense : ExpenseObj, cancelFunc : Function }) {
  const navigate = useNavigate();
  const [isConfirmBtn, setConfirmBtn] = useState(false);
  const [res, setRes] = useState<UserObj[]>([])
  const [selected, setSelected] = useState<Option[]>(expense.sharedUsers.map((usr) => ({ label: usr, value: usr })) as Option[]);
  const [options, setOptions] = useState();


  useEffect(() => {
    axios.get('api/users')
    .then(function (response: any) {
      setRes(response.data);
      
    })
    .catch(function (error: any) {
      console.log(error);
    }); 

    if(isConfirmBtn){
      console.log(selected);
      axios.patch(`api/expenses/share/${expense._id}`, 
      {
        expenseAmount: expense.expenseAmount,
        sharedUsers: selected.map((op) => (op.label))
      }, 
      )
      .then(function (response: any) {
        // console.log(response.data);
        setRes(response.data);
        navigate(0);
      })
      .catch(function (error: any) {
        console.log(error);
      });



      cancelFunc(false);
    }


  }, [isConfirmBtn])

  return(
    <div className="flex flex-col">
         
      {isConfirmBtn ? 
      <></>
      :
      <div>
        <MultiSelect
            options={res.filter(usr => (usr.username !== expense.owner))
                        .map((usr) => ({ label: usr.username, value: usr.username })
            )}
            value={selected}
            onChange={setSelected} 
            labelledBy={""}        
          />
        <div className="flex flex-row">
          <button 
            type="button" 
            onClick={() => setConfirmBtn(true)} 
            className='w-sm text-white font-bold my-1 py-1 px-2 rounded bg-amber-400 hover:bg-amber-300'
            >
            Send Share
          </button>
        </div>  
      </div>  
      }  
    </div>
    )
}