import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "@/shared/colors";
import { DeleteModal } from "./DeleteModal";

export const RightAction = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModalDelete = () => {
    setModalVisible(true);
  };

  const hideModalDelete = () => {
    setModalVisible(false);
  };

  return (
    <>
      <DeleteModal visible={modalVisible} hideModalDelete={hideModalDelete} />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={showModalDelete}
        className="bg-accent-red-background-primary w-[80] rounded-r-[6] items-center justify-center"
      >
        <MaterialIcons name="delete-outline" size={30} color={colors.white} />
      </TouchableOpacity>
    </>
  );
};
