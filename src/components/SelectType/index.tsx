import { FC } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import clsx from "clsx";

import { TransactionTypes } from "@/shared/enums/transaction-types";
import { colors } from "@/shared/colors";

interface ITransactionTypeSelectorProps {
  typeId: number;
  setTransactionType: (type: TransactionTypes) => void;
}

export const TransactionTypeSelector: FC<ITransactionTypeSelectorProps> = ({
  typeId,
  setTransactionType,
}) => {
  return (
    <View className="flex-row justify-between gap-2 mt-2">
      <TouchableOpacity
        onPress={() => setTransactionType(TransactionTypes.REVENUE)}
        className={clsx(
          "flex-row items-center p-2 flex-1 justify-center h-[58] rounded-lg",
          typeId === TransactionTypes.REVENUE
            ? "bg-accent-brand-light"
            : "bg-background-tertiary"
        )}
      >
        <MaterialIcons
          name="arrow-circle-up"
          size={30}
          className="mr-2"
          color={
            typeId === TransactionTypes.REVENUE
              ? colors.white
              : colors["accent-brand-light"]
          }
        />
        <Text className="text-white font-bold">Entrada</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setTransactionType(TransactionTypes.EXPENSE)}
        className={clsx(
          "flex-row items-center p-2 flex-1 justify-center h-[58] rounded-lg",
          typeId === TransactionTypes.EXPENSE
            ? "bg-accent-red"
            : "bg-background-tertiary"
        )}
      >
        <MaterialIcons
          name="arrow-circle-down"
          size={30}
          className="mr-2"
          color={
            typeId === TransactionTypes.EXPENSE
              ? colors.white
              : colors["accent-red"]
          }
        />
        <Text className="text-white font-bold">Saída</Text>
      </TouchableOpacity>
    </View>
  );
};
