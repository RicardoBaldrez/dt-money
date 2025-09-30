import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";

import { useAuthContext } from "@/context/auth.context";
import { AppHeader } from "@/components/AppHeader";

export const Home = () => {
  const { handleLogout } = useAuthContext();

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <AppHeader />
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={handleLogout}>ˇ
        <Text>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
