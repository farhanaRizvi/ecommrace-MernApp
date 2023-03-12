import "./App.css";
import AppRoutes from "./router";
import { useContext ,useEffect } from "react";
import {GlobalContexts} from './component/reducer/context'
import axios from "axios";

function App() {

  let {  dispatch } = useContext(GlobalContexts);

  useEffect(() => {
    const getProfile = async () => {
      let baseUrl = "server-production-4f8d.up.railway.app";
      try {
        let response = await 
       
        axios.get(`${baseUrl}/profile`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          console.log("response : ", response.data);

          dispatch({ type: "USER_LOGIN", payload: response.data });
        } else {
          dispatch({ type: "USER_LOGOUT" });
        }
      } catch (e) {
        console.log("Error in api call: ", e);
        dispatch( {type : "USER_LOGOUT"});
      }
    }

getProfile();
  }, []);

  return (
    <>
     <AppRoutes/>
    </>
  );
}

export default App;
