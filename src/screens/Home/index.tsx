import { useEffect } from "react";
import { SafeAreaView, FlatList } from "react-native";

import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useAuthContext, useTransactionContext } from "@/context";
import { ListHeader } from "./ListHeader";

export const Home = () => {
  const { handleLogout } = useAuthContext();
  const { fetchCategories } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const handleFetchCategories = async () => {
    try {
      await fetchCategories();
    } catch (error) {
      handleError(error, 'Falha ao buscar categorias');
    }
  }

  useEffect(() => {
    (async () => {
      handleFetchCategories();
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-secondary">
      <FlatList
        data={[]}
        renderItem={(item) => <></>}
        ListHeaderComponent={<ListHeader />}
      />
    </SafeAreaView>
  );
};
