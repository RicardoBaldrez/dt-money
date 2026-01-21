import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
  useMemo,
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
import { IFilters } from "@/shared/interfaces/https/getTransactionRequest";

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

interface IHandleFiltersParams {
  key: keyof IFilters;
  value: boolean | Date | number;
}

const filterInitialState: IFilters = {
  from: undefined,
  to: undefined,
  typeId: undefined,
  categoryIds: {},
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
  setSearchText: (text: string) => void;
  searchText: string;
  filters: IFilters;
  handleFilters: (params: IHandleFiltersParams) => void;
  handleCategoryFilter: (categoryId: number) => void;
  resetFilters: () => Promise<void>;
};

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TransactionCategoryResponse[]>(
    []
  );
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<IFilters>(filterInitialState);
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

  const categoryIds = useMemo(() => {
    return Object.entries(filters.categoryIds).filter(([key, value]) => value).map(([key]) => Number(key));
  }, [filters.categoryIds]);

  const handleLoadings = ({ key, value }: IHandleLoadingsParams) => setLoadings((prevState) => ({
    ...prevState,
    [key]: value,
  }));

  const refreshTransactions = useCallback(async () => {
    const { page, perPage } = pagination;

    const transactionsResponse = await transactionService.getTransactions({
      page: 1,
      perPage: page * perPage,
      ...filters,
      categoryIds,
    });

    setTransactions(transactionsResponse.data);
    setTotalTransactions(transactionsResponse.totalTransactions);
    setPagination({
      ...pagination,
      page: 1,
      totalRows: transactionsResponse.totalRows,
      totalPages: transactionsResponse.totalPages,
    });
  }, [pagination, filters, categoryIds]);

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
    async ({ page = 1 }: IFetchTransactionsParams) => {
      const transactionsResponse = await transactionService.getTransactions({
        page,
        perPage: pagination.perPage,
        searchText,
        ...filters,
        categoryIds,
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
    [pagination, searchText, categoryIds, filters]
  );

  const loadMoreTransactions = useCallback(async () => {
    if (loadings.loadMore || pagination.page >= pagination.totalPages) return;
    await fetchTransactions({ page: pagination.page + 1 });
  }, [loadings.loadMore, pagination]);

  const handleFilters = ({ key, value }: IHandleFiltersParams) => {
    setFilters((prevState) => ({ ...prevState, [key]: value }))
  }

  const handleCategoryFilter = (categoryId: number) => {
    setFilters((prevState) => ({
      ...prevState,
      categoryIds: {
        ...prevState.categoryIds,
        [categoryId]: !prevState.categoryIds[categoryId],
      },
    }));
  }

  const resetFilters = useCallback(async () => {
    setFilters(filterInitialState);
    setSearchText("");

    const transactionsResponse = await transactionService.getTransactions({
      page: 1,
      perPage: pagination.perPage,
      categoryIds: [],
      searchText: "",
    });

    setTransactions(transactionsResponse.data);
    setTotalTransactions(transactionsResponse.totalTransactions);
    setPagination({
      ...pagination,
      page: 1,
      totalRows: transactionsResponse.totalRows,
      totalPages: transactionsResponse.totalPages,
    });
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
        loadMoreTransactions,
        loadings,
        handleLoadings,
        pagination,
        setSearchText,
        searchText,
        filters,
        handleFilters,
        handleCategoryFilter,
        resetFilters,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
