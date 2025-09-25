import { FC, useEffect } from "react";
import { Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/shared/colors";
import { useAuthContext } from "@/context/auth.context";

interface ILoadingProps {
  setIsLoading: (isLoading: boolean) => void;
}

export const Loading: FC<ILoadingProps> = ({ setIsLoading }) => {
  const { restoreUserSession, handleLogout } = useAuthContext();

  useEffect(() => {
    (async () => {
      try {
        const user = await restoreUserSession();
        if (!user) {
          await handleLogout();
        }
      } catch (error) {
        await handleLogout();
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <SafeAreaView className="bg-background-primary items-center justify-center flex-1">
      <>
        <Image
          className="h-[48px] w-[255px]"
          source={require("@/assets/Logo.png")}
        />
        <ActivityIndicator color={colors.white} className="mt-20" />
      </>
    </SafeAreaView>
  );
};
