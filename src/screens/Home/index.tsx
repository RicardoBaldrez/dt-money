import { useEffect } from "react";
import { Text, TouchableOpacity, SafeAreaView } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useAuthContext, useTransactionContext } from "@/context";

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
    <SafeAreaView className="flex-1 bg-background-primary">
      <AppHeader />
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
