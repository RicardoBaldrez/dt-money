import { View, ScrollView, Text } from "react-native";

import { AppHeader } from "@/components/AppHeader";

import { TransactionTypes } from "@/shared/enums/transaction-types";

import { TransactionCard } from "./TransactionCard";

export const ListHeader = () => {
  return (
    <>
      <AppHeader />
      <View className="h-[150] w-full">
        <View className="h-[50px] bg-background-primary" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="absolute pl-6 h-[141]"
        >
          <TransactionCard type={TransactionTypes.EXPENSE} amount={0} />
          <TransactionCard type={TransactionTypes.REVENUE} amount={0} />
          <TransactionCard type="total" amount={0} />
        </ScrollView>
      </View>
    </>
  );
};
