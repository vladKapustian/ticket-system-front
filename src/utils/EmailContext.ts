import { Dispatch, SetStateAction, createContext, useState } from "react";

interface TEmailContext {
  userEmail: string;
  setUserEmail: Dispatch<SetStateAction<string>> | (()=>void);
}

// const [state, setState] = useState()
export const EmailContext = createContext<TEmailContext>({ userEmail: "", setUserEmail: ()=>{} });
