import { FC } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { TransactionTypes } from "@/shared/enums/transaction-types";
import { colors } from "@/shared/colors";

type TransactionCardType = TransactionTypes | "total";

interface Props {
  type: TransactionCardType;
  amount: number;
}

interface IconsData {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
}

const ICONS: Record<TransactionCardType, IconsData> = {
  [TransactionTypes.REVENUE]: {
    color: colors["accent-brand-light"],
    name: "arrow-circle-up",
  },
  [TransactionTypes.EXPENSE]: {
    color: colors["accent-red"],
    name: "arrow-circle-down",
  },
  total: {
    color: colors.white,
    name: "attach-money",
  },
}

export const TransactionCard: FC<Props> = ({ type, amount }) => {
  const iconData = ICONS[type];

  return (
    <View>
      <MaterialIcons name={iconData.name} color={iconData.color} size={26} />
    </View>
  )
}