import { Dispatch, SetStateAction, createContext } from "react";

interface TEmailContext {
  userEmail: string;
  setUserEmail: Dispatch<SetStateAction<string>> | null;
}

export const EmailContext = createContext<TEmailContext>({ userEmail: "", setUserEmail: null });
