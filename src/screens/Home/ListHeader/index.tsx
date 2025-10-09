import { View, ScrollView, Text } from "react-native";

import { AppHeader } from "@/components/AppHeader";

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
          
        </ScrollView>
      </View>
    </>
  );
};
