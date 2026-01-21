import { View, Text, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";

import { useTransactionContext } from "@/context";
import { TransactionTypes } from "@/shared/enums/transaction-types";

export const TypeFilter = () => {
  const { filters, handleFilters } = useTransactionContext();

  const selectType = (typeId: TransactionTypes) => {
    handleFilters({ key: "typeId", value: typeId });
  }

  return (
    <View className="mb-6">
      <Text className="text-base font-medium mb-5 text-gray-600">Tipo de transação</Text>
      <TouchableOpacity onPress={() => selectType(TransactionTypes.REVENUE)} className="flex-row items-center py-2">
        <Checkbox onValueChange={() => selectType(TransactionTypes.REVENUE)} value={filters.typeId === TransactionTypes.REVENUE} className="mr-4" />
        <Text className="text-white text-lg">Entrada</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => selectType(TransactionTypes.EXPENSE)} className="flex-row items-center py-2">
        <Checkbox onValueChange={() => selectType(TransactionTypes.EXPENSE)} value={filters.typeId === TransactionTypes.EXPENSE} className="mr-4" />
        <Text className="text-white text-lg">Saída</Text>
      </TouchableOpacity>
    </View>
  )
}