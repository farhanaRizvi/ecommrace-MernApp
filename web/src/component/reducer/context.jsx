import React, { createContext, useReducer } from "react";
import { reducer } from '../reducer/reducer';

export const GlobalContexts = createContext("Initial Value");


let data = {
  user: {},
  isLogin: null,
  darkTheme: true,
  cart: JSON.parse(localStorage.getItem("cartItem")) || [],
  baseUrl: "server-production-4f8d.up.railway.app"
   
};  


export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, data);
  return (
    <GlobalContexts.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContexts.Provider>
  );
}
