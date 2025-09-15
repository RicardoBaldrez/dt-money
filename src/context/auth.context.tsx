import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

import { FormLoginParams } from "@/screens/Login/LoginForm";
import { RegisterFormParams } from "@/screens/Register/RegisterForm";
import * as AuthService from "@/shared/services/dt-money/auth.service";
import { IUser } from "@/shared/interfaces/user-interface";

type AuthContextType = {
  user: IUser | null;
  token: string | null;
  handleAuthenticate: (param: FormLoginParams) => Promise<void>;
  handleRegister: (param: RegisterFormParams) => Promise<void>;
  handleLogout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleAuthenticate = async (userData: FormLoginParams) => {
    const { user, token } = await AuthService.authenticate(userData);
    setUser(user);
    setToken(token);
  };

  const handleRegister = async (formData: RegisterFormParams) => {
    const { user, token } = await AuthService.registerUser(formData);
    setUser(user);
    setToken(token);
  };
  const handleLogout = () => {};

  return (
    <AuthContext.Provider
      value={{ user, token, handleAuthenticate, handleRegister, handleLogout }}
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
