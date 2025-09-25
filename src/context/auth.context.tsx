import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FormLoginParams } from "@/screens/Login/LoginForm";
import { RegisterFormParams } from "@/screens/Register/RegisterForm";
import * as AuthService from "@/shared/services/dt-money/auth.service";
import { IUser } from "@/shared/interfaces/user-interface";
import { IAuthenticateResponse } from "@/shared/interfaces/https/authenticate-response";

type AuthContextType = {
  user: IUser | null;
  token: string | null;
  handleAuthenticate: (param: FormLoginParams) => Promise<void>;
  handleRegister: (param: RegisterFormParams) => Promise<void>;
  handleLogout: () => void;
  restoreUserSession: () => Promise<string | null>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleAuthenticate = async (userData: FormLoginParams) => {
    const { user, token } = await AuthService.authenticate(userData);
    await AsyncStorage.setItem("dt-money-user", JSON.stringify({ user, token }));
    setUser(user);
    setToken(token);
  };

  const handleRegister = async (formData: RegisterFormParams) => {
    const { user, token } = await AuthService.registerUser(formData);
    await AsyncStorage.setItem("dt-money-user", JSON.stringify({ user, token }));
    setUser(user);
    setToken(token);
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setUser(null);
    setToken(null);
  };

  const restoreUserSession = async () => {
    const userData = await AsyncStorage.getItem("dt-money-user");
    if (userData) {
      const { user, token } = JSON.parse(userData) as IAuthenticateResponse;
      setUser(user);
      setToken(token);
    }

    return userData;
  }

  return (
    <AuthContext.Provider
      value={{ user, token, handleAuthenticate, handleRegister, handleLogout, restoreUserSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
};
