import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

import {
  ICreateTransactionRequest,
  TransactionCategoryResponse,
} from "@/shared/interfaces/https";
import * as transactionService from "@/shared/services/dt-money/transaction.service";

export type ITransactionContext = {
  fetchCategories: () => Promise<void>;
  categories: TransactionCategoryResponse[];
  createTransaction: (transaction: ICreateTransactionRequest) => Promise<void>;
};

export const TransactionContext = createContext({} as ITransactionContext);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TransactionCategoryResponse[]>(
    []
  );

  const fetchCategories = async () => {
    const categoriesResponse =
      await transactionService.getTransactionCategories();
    setCategories(categoriesResponse);
  };

  const createTransaction = async (transaction: ICreateTransactionRequest) => {
    await transactionService.createTransaction(transaction);
  };

  return (
    <TransactionContext.Provider
      value={{ categories, fetchCategories, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
