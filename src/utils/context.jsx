import React, { useState, useContext, useReducer, useEffect } from "react";
import { appReducer } from "./reducer";

export const AppContext = React.createContext();


const defaultState = {
  activePage: "",
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, defaultState);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  useEffect(() => {
    // Add an event listener to update the window width when it changes
    window.addEventListener("resize", handleResize);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };


  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        windowWidth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
