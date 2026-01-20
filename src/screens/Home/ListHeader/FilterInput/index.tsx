import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import { useBottomSheetContext, useTransactionContext } from "@/context";
import { colors } from "@/shared/colors";
import { TransactionFilters } from "./TransactionFilters";

export const FilterInput = () => {
  const { pagination, searchText, setSearchText, fetchTransactions } = useTransactionContext();
  const { openBottomSheet } = useBottomSheetContext();

  const [text, setText] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchText(text);
    }, 500);

    return () => clearTimeout(handler);
  }, [text]);

  useEffect(() => {
    (async () => {
      await fetchTransactions({ page: 1 });
    })();
  }, [searchText]);

  return (
    <View className="mb-4 w-[90%] self-center">
      <View className="w-full flex-row justify-between items-center mt-4 mb-3">
        <Text className="text-white text-xl font-bold">Transações</Text>
        <Text className="text-gray-700 text-base">{pagination.totalRows} {pagination.totalRows === 1 ? 'transação' : 'transações'}</Text>
      </View>
      <TouchableOpacity className="flex-row items-center justify-between h-16">
        <TextInput value={text} onChangeText={setText} className="h-[50] text-white w-full bg-background-primary text-lg pl-4" placeholderTextColor={colors.gray[600]} placeholder="Busque uma transação" />
        <TouchableOpacity className="absolute right-0" onPress={() => openBottomSheet(<TransactionFilters />, 1)}>
          <MaterialIcons name="filter-list" size={26} color={colors["accent-brand-light"]} className="mr-3" />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};