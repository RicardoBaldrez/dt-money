import { dtMoneyApi } from "@/shared/api/dt-money";
import {
  ICreateTransactionRequest,
  TransactionCategoryResponse,
  IGetTransactionRequest,
  IGetTransactionResponse,
} from "@/shared/interfaces/https";
import qs from "qs";

export const getTransactionCategories = async (): Promise<
  TransactionCategoryResponse[]
> => {
  const { data } = await dtMoneyApi.get<TransactionCategoryResponse[]>(
    "/transaction/categories"
  );

  return data;
};

export const createTransaction = async (
  transaction: ICreateTransactionRequest
) => {
  await dtMoneyApi.post("/transaction", transaction);
};

export const getTransactions = async (
  params: IGetTransactionRequest
): Promise<IGetTransactionResponse> => {
  const { data } = await dtMoneyApi.get<IGetTransactionResponse>(
    "/transaction",
    {
      params,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "repeat" }),
    }
  );

  return data;
};
