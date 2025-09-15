import { dtMoneyApi } from "@/shared/api/dt-money";
import { FormLoginParams } from "@/screens/Login/LoginForm";
import { IAuthenticateResponse } from "@/shared/interfaces/https/authenticate-response";
import { RegisterFormParams } from "@/screens/Register/RegisterForm";

export const authenticate = async (
  userData: FormLoginParams
): Promise<IAuthenticateResponse> => {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>(
    "/auth/login",
    userData
  );

  return data;
};

export const registerUser = async (
  userData: RegisterFormParams
): Promise<IAuthenticateResponse> => {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>(
    "/auth/register",
    userData
  );

  return data;
};
