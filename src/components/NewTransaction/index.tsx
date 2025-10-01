import { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "@/shared/colors";
import { ICreateTransactionRequest } from "@/shared/interfaces/https/createTransactionRequest";
import { useBottomSheetContext } from "@/context";

export const NewTransaction = () => {
  const { closeBottomSheet } = useBottomSheetContext();

  const [transaction, setTransaction] = useState<ICreateTransactionRequest>({
    description: "",
    typeId: 0,
    categoryId: 0,
    value: 0,
  });

  return (
    <View className="px-8 py-5 w-full flex-row justify-between items-center">
      <Text className="text-white text-xl font-bold">Nova transação</Text>
      <TouchableOpacity
        onPress={closeBottomSheet}
        className=""
      >
        <MaterialIcons name="close" size={20} color={colors.gray[700]} />
      </TouchableOpacity>
    </View>
  );
};
