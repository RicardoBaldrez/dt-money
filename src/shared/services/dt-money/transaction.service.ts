import { dtMoneyApi } from "@/shared/api/dt-money";
import {
  ICreateTransactionRequest,
  TransactionCategoryResponse,
} from "@/shared/interfaces/https";

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
