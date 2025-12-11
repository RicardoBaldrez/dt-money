import { FC } from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { TransactionTypes } from "@/shared/enums/transaction-types";
import { useTransactionContext } from "@/context";

import { ICONS } from "./strategies/icon-strategy";
import { CARD_DATA } from "./strategies/card-data-strategy";
export type TransactionCardType = TransactionTypes | "total";

interface Props {
  type: TransactionCardType;
  amount: number;
}

export const TransactionCard: FC<Props> = ({ type, amount }) => {
  const iconData = ICONS[type];
  const cardData = CARD_DATA[type];

  const { transactions } = useTransactionContext();

  const lastTransaction = transactions.find(
    ({ type: transactionType }) => transactionType.id === type
  );

  return (
    <View
      className={`bg-${cardData.bgColor} min-w-[280px] rounded-[6] px-8 py-6 justify-between mr-6`}
    >
      <View className="flex-row items-center justify-between mg-1">
        <Text className="text-white text-base">{cardData.label}</Text>
        <MaterialIcons name={iconData.name} color={iconData.color} size={26} />
      </View>
      <View>
        <Text className="text-gray-400 text-2xl font-bold">
          R$ {amount.toFixed(2).replace(".", ",")}
        </Text>
        {type !== "total" && (
          <Text className="text-gray-700">
            {lastTransaction?.createdAt
              ? format(
                  lastTransaction.createdAt,
                  `'${cardData.label.toLowerCase()} em' d 'de' MMMM`,
                  { locale: ptBR }
                )
              : "Nenhum transação encontrada"}
          </Text>
        )}
      </View>
    </View>
  );
};
