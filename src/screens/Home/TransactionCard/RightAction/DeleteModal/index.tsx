import { FC } from "react";
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "@/shared/colors";
interface IDeleteModalProps {
  visible: boolean;
  hideModalDelete: () => void;
  handleDeleteTransaction: () => void;
  isLoading: boolean;
}

export const DeleteModal: FC<IDeleteModalProps> = ({
  visible,
  hideModalDelete,
  handleDeleteTransaction,
  isLoading
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
                  <TouchableOpacity 
                    onPress={hideModalDelete}
                    disabled={isLoading}
                  >
                    <MaterialIcons
                      name="close"
                      size={25}
                      color={colors.gray[800]}
                    />
                  </TouchableOpacity>
                </View>
                <View className="p-3 flex-1 border-b border-gray-800 items-center justify-center">
                  <Text className="text-gray-500 text-lg leading-8">
                    Tem certeza que deseja apagar a transação? Esta ação não
                    pode ser desfeita.
                  </Text>
                </View>
                <View className="flex-row justify-end gap-4 w-full p-6 pb-0 pr-0">
                  <TouchableOpacity 
                    onPress={hideModalDelete}
                    disabled={isLoading}
                    className="w-[100] bg-none border-2 border-accent-brand items-center justify-center p-3 rounded-[6]"
                  >
                    <Text className="text-accent-brand">Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={handleDeleteTransaction} 
                    disabled={isLoading}
                    className="w-[100] bg-none items-center justify-center p-3 rounded-[6] bg-accent-red-background-primary"
                  >
                    {isLoading ? (
                      <ActivityIndicator size="small" color={colors.white} />
                    ) : (
                      <Text className="text-white">Apagar</Text>
                    )}
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
