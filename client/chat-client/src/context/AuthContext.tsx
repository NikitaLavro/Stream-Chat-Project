import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { createContext, ReactNode, useContext } from "react";

const Context = createContext<AuthContext | null>(null);

export function useAuth() {
  return useContext(Context);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const signup = useMutation({
    mutationFn: (user: User) => {
      return axios.post(`${import.meta.env.VITE_SERVER_URL}/signup`, user);
    },
  });

  return <Context.Provider value={{ signup }}>{children}</Context.Provider>;
}

type AuthContext = {
  signup: UseMutationResult<AxiosResponse, unknown, User>;
};

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  image?: string;
}
