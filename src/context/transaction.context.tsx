import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

import {
  ICreateTransactionRequest,
  TransactionCategoryResponse,
} from "@/shared/interfaces/https";
import * as transactionService from "@/shared/services/dt-money/transaction.service";
import { ITransaction } from "@/shared/interfaces/transaction";

export type ITransactionContext = {
  fetchCategories: () => Promise<void>;
  categories: TransactionCategoryResponse[];
  createTransaction: (transaction: ICreateTransactionRequest) => Promise<void>;
  fetchTransactions: () => Promise<void>;
};

export const TransactionContext = createContext({} as ITransactionContext);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TransactionCategoryResponse[]>(
    []
  );
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const fetchCategories = async () => {
    const categoriesResponse =
      await transactionService.getTransactionCategories();
    setCategories(categoriesResponse);
  };

  const createTransaction = async (transaction: ICreateTransactionRequest) => {
    await transactionService.createTransaction(transaction);
  };

  const fetchTransactions = useCallback(async () => {
    const transactionsResponse = await transactionService.getTransactions({
      page: 1,
      perPage: 10,
    })

    setTransactions(transactionsResponse.data);
  }, [])

  return (
    <TransactionContext.Provider
      value={{ categories, fetchCategories, createTransaction, fetchTransactions }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
