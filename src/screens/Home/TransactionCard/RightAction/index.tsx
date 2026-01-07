import { FC, useState } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { DeleteModal } from "./DeleteModal";
import { colors } from "@/shared/colors";
import * as transactionService from "@/shared/services/dt-money/transaction.service";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useSnackbarContext } from "@/context";

interface IRightActionProps {
  transactionId: number;
}

export const RightAction: FC<IRightActionProps> = ({ transactionId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { handleError } = useErrorHandler();
  const { notify } = useSnackbarContext();

  const showModalDelete = () => {
    setModalVisible(true);
  };

  const hideModalDelete = () => {
    setModalVisible(false);
  };

  const handleDeleteTransaction = async () => {
    setIsLoading(true);
    try {
      await transactionService.deleteTransaction(transactionId);
      notify({ message: "Transação deletada com sucesso", type: "success" });
      hideModalDelete();
    } catch (error) {
      handleError(error, "Falha ao deletar transação");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DeleteModal
        handleDeleteTransaction={handleDeleteTransaction}
        visible={modalVisible}
        hideModalDelete={hideModalDelete}
        isLoading={isLoading}
      />
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
