import { createContext, FC, PropsWithChildren, useContext, useState } from "react";

import { TransactionCategoryResponse } from "@/shared/interfaces/https";
import * as transactionService from "@/shared/services/dt-money/transaction.service";

export type ITransactionContext = {
  fetchCategories: () => Promise<void>;
  categories: TransactionCategoryResponse[];
};

export const TransactionContext = createContext({} as ITransactionContext);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TransactionCategoryResponse[]>([]);

  const fetchCategories = async () => {
    const categoriesResponse = await transactionService.getTransactionCategories();
    setCategories(categoriesResponse);
  };

  return (
    <TransactionContext.Provider value={{ categories, fetchCategories }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
}
