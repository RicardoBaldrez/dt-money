import { useEffect } from "react";
import { SafeAreaView, FlatList, RefreshControl } from "react-native";

import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useAuthContext, useTransactionContext } from "@/context";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";

export const Home = () => {
  const { handleLogout } = useAuthContext();
  const {
    fetchCategories,
    fetchTransactions,
    transactions,
    refreshTransactions,
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

  useEffect(() => {
    (async () => {
      await Promise.all([handleFetchCategories(), fetchTransactions({ page: 1 })]);
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        data={transactions}
        keyExtractor={({ id }) => `transaction-${id}`}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        ListHeaderComponent={<ListHeader />}
        className=" bg-background-secondary"
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refreshTransactions}
          />
        }
      />
    </SafeAreaView>
  );
};
