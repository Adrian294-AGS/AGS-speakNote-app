import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "./authContext";

const SOCKETCONTEXT = createContext();
const { user } = useAuth();

export const socketContext = ({Children}) => {





    return(
        <SOCKETCONTEXT.Provider value={}>
            {Children}
        </SOCKETCONTEXT.Provider>
    )
}

export const useSocket = () => useContext(SOCKETCONTEXT);