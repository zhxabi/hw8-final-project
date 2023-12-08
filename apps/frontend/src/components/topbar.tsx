import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { comment } from "postcss";

export default function TopBar({ isLoggedIn }: { isLoggedIn: Boolean }) {
  const navigate = useNavigate();
  const [isLogintBtn, setLoginBtn] = useState(false);
  const [isLogoutBtn, setLogoutBtn] = useState(false);
  const [isSignupBtn, setSignupBtn] = useState(false);

  useEffect(() => {
    if(isLogoutBtn){
      axios.post('api/logout', )
      .then(function (response: any) {
        console.log(response);
        navigate(0);
      })
      .catch(function (error: any) {
        console.log(error);
      });
      setLogoutBtn(false)

    } 
  }, [isLogoutBtn]);

  return(
    <div >
      {isLoggedIn ? 
        <div className="flex flex-row justify-end mx-auto rounded  py-4">
          <button 
            type="button" 
            onClick={() => setLogoutBtn(true)} 
            className='text-teal font-bold py-2 px-2 rounded  hover:text-teal-300'
            >
            Log Out
          </button>
        </div>
       : 
        <div className="flex flex-row justify-end mx-auto rounded  py-4">
          <button 
            type="button" 
            onClick={() => navigate("/signup")} 
            className=' text-teal-600 font-bold py-2 px-2 rounded hover:text-teal-300'
            >
            Sign Up
          </button>
          <button 
            type="button" 
            onClick={() => navigate("/login")} 
            className=' text-teal-600 font-bold py-2 px-2 rounded hover:text-teal-300'
            >
            Log In
          </button>
        </div>
       }
    </div>
  )
}