import { useEffect } from "react";
import { SafeAreaView, FlatList } from "react-native";

import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useAuthContext, useTransactionContext } from "@/context";
import { ListHeader } from "./ListHeader";

export const Home = () => {
  const { handleLogout } = useAuthContext();
  const { fetchCategories, fetchTransactions } = useTransactionContext();
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
      await Promise.all([handleFetchCategories(), fetchTransactions()]);
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        data={[]}
        renderItem={(item) => <></>}
        ListHeaderComponent={<ListHeader />}
        className=" bg-background-secondary"
      />
    </SafeAreaView>
  );
};
