//React Query
import { useMutation, UseMutationResult } from "@tanstack/react-query";

//Axios
import axios, { AxiosResponse } from "axios";

//Hooks
import { useLocalStorage } from "../hooks/useLocalStorage";

//React
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

//Router
import { useNavigate } from "react-router-dom";

//Stream
import { StreamChat } from "stream-chat";

const Context = createContext<AuthContext | null>(null);

export function useAuth() {
  return useContext(Context) as AuthContext;
}

export function useLoggenInAuth() {
  return useContext(Context) as AuthContext &
    Required<Pick<AuthContext, "user">>;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage<User>("user");
  const [token, setToken] = useLocalStorage<string>("token");
  const [streamChat, setStreamChat] = useState<StreamChat>();

  const signup = useMutation({
    mutationFn: (user: User) => {
      return axios.post(`${import.meta.env.VITE_SERVER_URL}/signup`, user);
    },
    onSuccess() {
      navigate("/login");
    },
  });

  const login = useMutation({
    mutationFn: (id: string) => {
      return axios
        .post(`${import.meta.env.VITE_SERVER_URL}/login`, { id })
        .then((res) => {
          return res.data as { token: string; user: User };
        });
    },
    onSuccess(data) {
      setUser(data.user);
      setToken(data.token);
    },
  });

  useEffect(() => {
    if (token == null || user == null) return;
    const chat = new StreamChat(import.meta.env.VITE_STREAM_API_KEY!);

    if (chat.tokenManager.token === token && chat.userID === user.id) return;

    let isInterrupted = false;
    const connectPromise = chat.connectUser(user, token).then(() => {
      if (isInterrupted) return;
      setStreamChat(chat);
    });

    return () => {
      isInterrupted = true;
      setStreamChat(undefined);
      connectPromise.then(() => {
        chat.disconnectUser();
      });
    };
  }, [token, user]);

  return (
    <Context.Provider value={{ signup, login, user, streamChat }}>
      {children}
    </Context.Provider>
  );
}

type AuthContext = {
  signup: UseMutationResult<AxiosResponse, unknown, User>;
  login: UseMutationResult<{ token: string; user: User }, unknown, string>;
  user?: User;
  streamChat?: StreamChat;
};

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  image?: string;
}
