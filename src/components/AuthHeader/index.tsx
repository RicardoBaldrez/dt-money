import { View, Image } from "react-native";
import { useKeyboardVisible } from "@/shared/hooks/useKeyboardVisible";

export const AuthHeader = () => {
  const isKeyboardVisible = useKeyboardVisible();

  if (isKeyboardVisible) return <></>;

  return (
    <View className="items-center justify-center w-full min-h-40">
      <Image
        source={require("@/assets/Logo.png")}
        className="w-[255px] h-[48px]"
      />
    </View>
  );
};
