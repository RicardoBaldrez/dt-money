import { useEffect } from "react";
import { SafeAreaView, FlatList, RefreshControl } from "react-native";

import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useTransactionContext } from "@/context";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";

export const Home = () => {
  const {
    fetchCategories,
    fetchTransactions,
    transactions,
    refreshTransactions,
    loadMoreTransactions,
    loading,
  } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const handleFetchCategories = async () => {
    try {
      await fetchCategories();
    } catch (error) {
      handleError(error, "Falha ao buscar categorias");
    }
  };

  const handleFetchInitialTransactions = async () => {
    try {
      await fetchTransactions({ page: 1 })
    } catch (error) {
      handleError(error, "Falha ao buscar transações");
    }
  }

  const handleLoadMoreTransactions = async () => {
    try {
      await loadMoreTransactions()
    } catch (error) {
      handleError(error, "Falha ao carregar novas transações");
    }
  }

  const handleRefreshTransactions = async () => {
    try {
      await refreshTransactions()
    } catch (error) {
      handleError(error, "Falha ao recarregar transações");
    }
  }

  useEffect(() => {
    (async () => {
      await Promise.all([
        handleFetchCategories(),
        handleFetchInitialTransactions(),
      ]);
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        data={transactions}
        ListHeaderComponent={<ListHeader />}
        keyExtractor={({ id }) => `transaction-${id}`}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        onEndReached={handleLoadMoreTransactions}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefreshTransactions}
          />
        }
        className=" bg-background-secondary"
      />
    </SafeAreaView>
  );
};
