import { useEffect } from "react";
import { SafeAreaView, FlatList, RefreshControl } from "react-native";

import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useTransactionContext } from "@/context";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";
import { EmptyList } from "./EmptyList";

export const Home = () => {
  const {
    fetchCategories,
    fetchTransactions,
    transactions,
    refreshTransactions,
    loadMoreTransactions,
    handleLoadings,
    loadings,
  } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const handleFetchCategories = async () => {
    try {
      handleLoadings({ key: "initial", value: true });
      await fetchCategories();
    } catch (error) {
      handleError(error, "Falha ao buscar categorias");
    } finally {
      handleLoadings({ key: "initial", value: false });
    }
  };

  const handleFetchInitialTransactions = async () => {
    try {
      handleLoadings({ key: "initial", value: true });
      await fetchTransactions({ page: 1 });
    } catch (error) {
      handleError(error, "Falha ao buscar transações");
    } finally {
      handleLoadings({ key: "initial", value: false });
    }
  };

  const handleLoadMoreTransactions = async () => {
    try {
      handleLoadings({ key: "loadMore", value: true });
      await loadMoreTransactions();
    } catch (error) {
      handleError(error, "Falha ao carregar novas transações");
    } finally {
      handleLoadings({ key: "loadMore", value: false });
    }
  };

  const handleRefreshTransactions = async () => {
    try {
      handleLoadings({ key: "refresh", value: true });
      await refreshTransactions();
    } catch (error) {
      handleError(error, "Falha ao recarregar transações");
    } finally {
      handleLoadings({ key: "refresh", value: false });
    }
  };

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
        data={[]}
        ListHeaderComponent={<ListHeader />}
        keyExtractor={({ id }) => `transaction-${id}`}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        onEndReached={handleLoadMoreTransactions}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={loadings.initial ? null : <EmptyList />}
        refreshControl={
          <RefreshControl refreshing={loadings.refresh} onRefresh={handleRefreshTransactions} />
        }
        className=" bg-background-secondary"
      />
    </SafeAreaView>
  );
};
