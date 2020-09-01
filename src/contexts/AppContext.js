import React, { createContext, useReducer,useEffect } from "react";
import { appReducer } from "../reducers/appReducer";
import SnackBar from "../components/Snackbar/index";

export const AppContext = createContext();

const initialState = {
  isAuth:localStorage.getItem('token') ? true : false,
  token:localStorage.getItem('token') ? localStorage.getItem('token') : null
};

export const AppProvider = (props) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
      {state.snacks && <SnackBar message="sdsdsds" type={state.snacks.type} />}
    </AppContext.Provider>
  );
};
