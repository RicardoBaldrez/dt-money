import { FC } from "react";
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "@/shared/colors";

interface IDeleteModalProps {
  visible: boolean;
  hideModalDelete: () => void;
}

export const DeleteModal: FC<IDeleteModalProps> = ({
  visible,
  hideModalDelete,
}) => {
  return (
    <View className="flex-1 absolute">
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={hideModalDelete}
      >
        <TouchableWithoutFeedback onPress={hideModalDelete}>
          <View className="flex-1 bg-black/50 justify-center items-center">
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View className="m-5 bg-background-secondary rounded-[16] p-8 items-center shadow-lg w-[90%] h-[322] z-9">
                <View className="w-full flex-row items-center justify-between border-b border-gray-800 pb-6">
                  <View className="flex-row items-center">
                    <MaterialIcons
                      name="error-outline"
                      className="mr-4"
                      size={25}
                      color={colors.gray[400]}
                    />
                    <Text className="text-white text-xl font-bold">
                      Apagar transação?
                    </Text>
                  </View>
                  <TouchableOpacity onPress={hideModalDelete}>
                    <MaterialIcons
                      name="close"
                      size={25}
                      color={colors.gray[800]}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
