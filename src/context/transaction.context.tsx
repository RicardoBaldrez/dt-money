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
import { ITotalTransactions } from "@/shared/interfaces/totalTransactions";
import { IUpdateTransactionRequest } from "@/shared/interfaces/https/updateTransactionRequest";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useSnackbarContext } from "./snackbar.context";

export type ITransactionContext = {
  fetchCategories: () => Promise<void>;
  categories: TransactionCategoryResponse[];
  createTransaction: (transaction: ICreateTransactionRequest) => Promise<void>;
  updateTransaction: (transaction: IUpdateTransactionRequest) => Promise<void>;
  fetchTransactions: () => Promise<void>;
  totalTransactions: ITotalTransactions;
  transactions: ITransaction[];
  refreshTransactions: () => Promise<void>;
  loading: boolean;
};

export const TransactionContext = createContext({} as ITransactionContext);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TransactionCategoryResponse[]>(
    []
  );
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalTransactions, setTotalTransactions] =
    useState<ITotalTransactions>({
      revenue: 0,
      expense: 0,
      total: 0,
    });

  const { handleError } = useErrorHandler();
  const { notify } = useSnackbarContext();

  const refreshTransactions = async () => {
    setLoading(true);
    try {
      const transactionsResponse = await transactionService.getTransactions({
        page: 1,
        perPage: 10,
      });

      setTransactions(transactionsResponse.data);
      setTotalTransactions(transactionsResponse.totalTransactions);
    } catch (error) {
      handleError(error, "Falha ao atualizar os dados das transações. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    const categoriesResponse =
      await transactionService.getTransactionCategories();
    setCategories(categoriesResponse);
  };

  const createTransaction = async (transaction: ICreateTransactionRequest) => {
    await transactionService.createTransaction(transaction);
    await refreshTransactions();
  };

  const updateTransaction = async (transaction: IUpdateTransactionRequest) => {
    await transactionService.updateTransaction(transaction);
    await refreshTransactions();
  };

  const fetchTransactions = useCallback(async () => {
    const transactionsResponse = await transactionService.getTransactions({
      page: 1,
      perPage: 10,
    });

    setTransactions(transactionsResponse.data);
    setTotalTransactions(transactionsResponse.totalTransactions);
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        categories,
        fetchCategories,
        createTransaction,
        updateTransaction,
        fetchTransactions,
        totalTransactions,
        transactions,
        refreshTransactions,
        loading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
