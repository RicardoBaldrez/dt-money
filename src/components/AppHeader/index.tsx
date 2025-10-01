import { View, Image, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "@/shared/colors";
import { useAuthContext, useBottomSheetContext } from "@/context";

export const AppHeader = () => {
  const { handleLogout } = useAuthContext();
  const { openBottomSheet } = useBottomSheetContext();

  return (
    <View className="w-full flex-row p-8 justify-between">
      <View>
        <Image
          source={require("@/assets/Logo.png")}
          className="w-[130px] h-[30px]"
        />
        <TouchableOpacity
          className="flex-row items-center gap-2 mt-2"
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={15} color={colors.gray[700]} />
          <Text className="text-gray-700 text-base">Sair da conta</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="bg-accent-brand w-[130px] items-center justify-center rounded-xl h-[50px]"
        onPress={() => {
          openBottomSheet(<Text>Formulário da nova transação</Text>, 0)
        }}
      >
        <Text className="text-white text-sm font-bold">Nova transação</Text>
      </TouchableOpacity>
    </View>
  );
};
