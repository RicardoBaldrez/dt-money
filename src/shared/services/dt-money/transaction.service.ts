import { dtMoneyApi } from "@/shared/api/dt-money";
import { TransactionCategoryResponse } from "@/shared/interfaces/https";

export const getTransactionCategories = async (): Promise<
  TransactionCategoryResponse[]
> => {
  const { data } = await dtMoneyApi.get<TransactionCategoryResponse[]>(
    "/transaction/categories"
  );

  return data;
};
