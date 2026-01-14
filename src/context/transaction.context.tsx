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
  IPagination,
  TransactionCategoryResponse,
} from "@/shared/interfaces/https";
import * as transactionService from "@/shared/services/dt-money/transaction.service";
import { ITransaction } from "@/shared/interfaces/transaction";
import { ITotalTransactions } from "@/shared/interfaces/totalTransactions";
import { IUpdateTransactionRequest } from "@/shared/interfaces/https/updateTransactionRequest";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";

interface IFetchTransactionsParams {
  page: number;
}

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  categories: TransactionCategoryResponse[];
  createTransaction: (transaction: ICreateTransactionRequest) => Promise<void>;
  updateTransaction: (transaction: IUpdateTransactionRequest) => Promise<void>;
  fetchTransactions: (params: IFetchTransactionsParams) => Promise<void>;
  totalTransactions: ITotalTransactions;
  transactions: ITransaction[];
  refreshTransactions: () => Promise<void>;
  loadMoreTransactions: () => Promise<void>;
  loading: boolean;
};

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TransactionCategoryResponse[]>(
    []
  );
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    perPage: 5,
    totalRows: 0,
    totalPages: 0,
  });
  const [totalTransactions, setTotalTransactions] =
    useState<ITotalTransactions>({
      revenue: 0,
      expense: 0,
      total: 0,
    });

  const { handleError } = useErrorHandler();

  const refreshTransactions = async () => {
    const { page, perPage } = pagination;

    setLoading(true);
    try {
      const transactionsResponse = await transactionService.getTransactions({
        page: 1,
        perPage: page * perPage,
      });

      setTransactions(transactionsResponse.data);
      setTotalTransactions(transactionsResponse.totalTransactions);
      setPagination({
        ...pagination,
        page: 1,
        totalRows: transactionsResponse.totalRows,
        totalPages: transactionsResponse.totalPages,
      });
    } catch (error) {
      handleError(
        error,
        "Falha ao atualizar os dados das transações. Tente novamente."
      );
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

  const fetchTransactions = useCallback(
    async ({ page = 0 }: IFetchTransactionsParams) => {
      setLoading(true);

      const transactionsResponse = await transactionService.getTransactions({
        page,
        perPage: pagination.perPage,
      });

      if(page === 1) {
        setTransactions(transactionsResponse.data);
      } else {
        setTransactions((prevState) => [...prevState, ...transactionsResponse.data]);
      }

      setTotalTransactions(transactionsResponse.totalTransactions);

      setPagination({
        ...pagination,
        page,
        totalRows: transactionsResponse.totalRows,
        totalPages: transactionsResponse.totalPages,
      });

      setLoading(false);
    },
    [pagination]
  );

  const loadMoreTransactions = useCallback(async () => {
    if (loading || pagination.page >= pagination.totalPages) return;
    await fetchTransactions({ page: pagination.page + 1 });
  }, [loading, pagination]);

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
        loadMoreTransactions,
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
