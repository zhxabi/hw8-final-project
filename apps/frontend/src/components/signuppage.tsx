import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import ErrMessage from "./errmessage";

export default function SignupPage() {
  const navigate = useNavigate();
  const [isSubmitBtn, setSubmitBtn] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [pswdInput, setPswdInput] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [isErr, setIsErr] = useState(false);

  useEffect(() => {
    if(isSubmitBtn){
      axios.post('api/signup', 
      {
        username: nameInput,
        password: pswdInput
      }, 
      )
      .then(function (response: any) {
        console.log(response);
        navigate("/login");
      })
      .catch(function (error: any) {
        console.log(error);
        setErrMessage(error.response.data.message)
        setIsErr(true);
      });
      setSubmitBtn(false)
    }
  }, [nameInput, pswdInput, isSubmitBtn]);


  return(
    // <div className="flex py-4 mx-auto">
    <div className="max-w-md flex-auto mx-auto rounded shadow-lg px-4 py-4">
      <div className='py-3 text-xl font-bold'>
          Sign up
      </div>
      <form className="mx-auto">
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Username"
          className='w-full py-2 my-2'
        />
        <input
          type="password"
          value={pswdInput}
          onChange={(e) => setPswdInput(e.target.value)}
          placeholder="Password"
          className='w-full py-2 my-2'
        />
        <button 
          type="button" 
          onClick={() => setSubmitBtn(true)} 
          className='w-full text-white font-bold py-2 px-2 rounded bg-teal-400 hover:bg-teal-300'
        >
          Sign Up
        </button>
        <div className='py-3'>
          Already have an account? <Link to={`/login`} className='text-teal-600 hover:text-teal-800'> Log in here</Link>
        </div>
      </form>
      {(isErr) ? <ErrMessage msg={errMessage} />  : null }
      
    </div>
  )
}