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

interface IFetchTransactionsParams {
  page: number;
}

interface ILoadings {
  initial: boolean;
  refresh: boolean;
  loadMore: boolean;
}

interface IHandleLoadingsParams {
  key: keyof ILoadings;
  value: boolean;
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
  loadings: ILoadings;
  handleLoadings: (params: IHandleLoadingsParams) => void;
  pagination: IPagination;
};

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TransactionCategoryResponse[]>(
    []
  );
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loadings, setLoadings] = useState<ILoadings>({
    initial: false,
    refresh: false,
    loadMore: false,
  });
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    perPage: 15,
    totalRows: 0,
    totalPages: 0,
  });
  const [totalTransactions, setTotalTransactions] =
    useState<ITotalTransactions>({
      revenue: 0,
      expense: 0,
      total: 0,
    });

  const handleLoadings = ({ key, value }: IHandleLoadingsParams) => setLoadings((prevState) => ({
    ...prevState,
    [key]: value,
  }));

  const refreshTransactions = useCallback(async () => {
    const { page, perPage } = pagination;

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
  }, [pagination]);

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
      const transactionsResponse = await transactionService.getTransactions({
        page,
        perPage: pagination.perPage,
      });

      if (page === 1) {
        setTransactions(transactionsResponse.data);
      } else {
        setTransactions((prevState) => [
          ...prevState,
          ...transactionsResponse.data,
        ]);
      }

      setTotalTransactions(transactionsResponse.totalTransactions);

      setPagination({
        ...pagination,
        page,
        totalRows: transactionsResponse.totalRows,
        totalPages: transactionsResponse.totalPages,
      });
    },
    [pagination]
  );

  const loadMoreTransactions = useCallback(async () => {
    if (loadings.loadMore || pagination.page >= pagination.totalPages) return;
    await fetchTransactions({ page: pagination.page + 1 });
  }, [loadings.loadMore, pagination]);

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
        loadings,
        handleLoadings,
        pagination,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
