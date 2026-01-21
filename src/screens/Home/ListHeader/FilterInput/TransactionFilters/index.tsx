import { View, Text, TouchableOpacity } from "react-native"
import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "@/shared/colors";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useBottomSheetContext, useTransactionContext } from "@/context";
import { AppButton } from "@/components/AppButton";

import { DateFilter } from "./DateFilter";
import { CategoryFilter } from "./CategoryFilter";
import { TypeFilter } from "./TypeFilter";

export const TransactionFilters = () => {
  const { closeBottomSheet } = useBottomSheetContext();
  const { fetchTransactions, handleLoadings, resetFilters } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const handleFetchTransactions = async () => {
    try {
      handleLoadings({ key: "refresh", value: true });
      await fetchTransactions({ page: 1 });
    } catch (error) {
      handleError(error, "Falha ao aplicar filtros de transações");
    } finally {
      handleLoadings({ key: "refresh", value: false });
      closeBottomSheet();
    }
  }

  const handleResetFilters = async () => {
    try {
      handleLoadings({ key: "refresh", value: true });
      await resetFilters();
    } catch (error) {
      handleError(error, "Falha ao alimpar filtros");
    } finally {
      handleLoadings({ key: "refresh", value: false });
      closeBottomSheet();
    }
  }

  return (
    <View className="flex-1 bg-gray[1000] p-6">
      <View className="flex-row justify-between items-center">
        <Text className="text-white text-xl font-bold mb-5">Filtrar transações</Text>
        <TouchableOpacity onPress={closeBottomSheet}>
          <MaterialIcons name="close" size={20} color={colors.gray[600]} />
        </TouchableOpacity>
      </View>
      <DateFilter />
      <CategoryFilter />
      <TypeFilter />
      <View className="flex-row gap-4 mt-8">
        <AppButton onPress={handleResetFilters} className="flex-1" mode="outline" widthFull={false}>Limpar filtros</AppButton>
        <AppButton onPress={handleFetchTransactions} className="flex-1" widthFull={false}>Filtrar</AppButton>
      </View>
    </View>
  )
}