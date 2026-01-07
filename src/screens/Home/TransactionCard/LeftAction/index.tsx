import { FC } from "react";
import { View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

import { ITransaction } from "@/shared/interfaces/transaction";
import { colors } from "@/shared/colors";
import { useBottomSheetContext } from "@/context/bottomSheet.context";

interface ILeftActionProps {
  transaction: ITransaction;
}

export const LeftAction: FC<ILeftActionProps> = ({ transaction }) => {
  const { openBottomSheet } = useBottomSheetContext();

  return (
    <Pressable onPress={() => {
      openBottomSheet(<></>, 1)
    }}>
      <View className="h-[140] bg-accent-blue w-[80] rounded-l-[6] items-center justify-center">
        <MaterialIcons name="edit" size={30} color={colors.white} />
      </View>
    </Pressable>
  );
};
