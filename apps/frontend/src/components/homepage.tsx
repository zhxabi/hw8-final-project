
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrMessage from "./errmessage";
import TopBar from "./topbar";
import ExpensePage from "./expensePage";
import InsightPage from "./insightPage";

export default function HomePage() {
  const [errMessage, setErrMessage] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [res, setRes] = useState([]);

  useEffect(() => {
    // const intervalID = setInterval(() => {
    //   axios.get('api/expenses')
    //   .then(function (response: any) {
    //     console.log(response.data);
    //     setRes(response.data);
    //   })
    //   .catch(function (error: any) {
    //     console.log(error);
    //     setErrMessage(error.response.data);
    //     setIsErr(true);
    //   });
    // }, 500)
    // return () => clearInterval(intervalID)
    axios.get('api/expenses')
      .then(function (response: any) {
        console.log(response.data);
        setRes(response.data);
      })
      .catch(function (error: any) {
        console.log(error);
        setErrMessage(error.response.data);
        setIsErr(true);
      });
  }, [isErr, errMessage])
  

  return(
    <div>
      {(isErr) ? <ErrMessage msg={errMessage} />  : null }
      <TopBar isLoggedIn={!isErr} />
      <div className="flex flex-row">

        <ExpensePage expenses={res} />
        <InsightPage expenses={res} />
      </div>
    </div>
  )
}