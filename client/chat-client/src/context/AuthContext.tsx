import { createContext, ReactNode, useContext } from "react";

type AuthContext = {};

const Context = createContext<AuthContext | null>(null);

export function useAuth() {
  return useContext(Context);
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <Context.Provider value={{}}>{children}</Context.Provider>;
}
