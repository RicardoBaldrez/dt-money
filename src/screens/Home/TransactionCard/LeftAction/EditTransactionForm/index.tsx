import { FC, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";
import CurrencyInput from "react-native-currency-input";
import { MaterialIcons } from "@expo/vector-icons";
import * as Yup from "yup";

import { colors } from "@/shared/colors";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { IUpdateTransactionRequest } from "@/shared/interfaces/https/updateTransactionRequest";
import { useBottomSheetContext, useTransactionContext } from "@/context";
import { ErrorMessage } from "@/components/ErrorMessage";
import { SelectCategoryModal } from "@/components/SelectCategoryModal";
import { TransactionTypeSelector } from "@/components/SelectType";
import { AppButton } from "@/components/AppButton";
import { transactionSchema } from "./schema";
import { ITransaction } from "@/shared/interfaces/transaction";

type ValidationErrorsTypes = Record<keyof IUpdateTransactionRequest, string>;

interface IEditTransactionFormProps {
  transaction: ITransaction;
}

export const EdiTransactionForm: FC<IEditTransactionFormProps> = ({
  transaction: transactionToUpdate,
}) => {
  const { closeBottomSheet } = useBottomSheetContext();
  const { updateTransaction } = useTransactionContext();
  const { handleError } = useErrorHandler();
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrorsTypes>();

  const [isLoading, setIsLoading] = useState(false);
  const [transaction, setTransaction] =
    useState<IUpdateTransactionRequest>({
      id: transactionToUpdate.id,
      value: transactionToUpdate.value,
      typeId: transactionToUpdate.typeId,
      categoryId: transactionToUpdate.categoryId,
      description: transactionToUpdate.description,
    });

  const handleUpdateTransaction = async () => {
    try {
      setIsLoading(true);
      await transactionSchema.validate(transaction, {
        abortEarly: false,
      });
      await updateTransaction(transaction);
      closeBottomSheet();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {} as ValidationErrorsTypes;

        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof IUpdateTransactionRequest] = err.message;
          }
        });

        setValidationErrors(errors);
      } else {
        handleError(error, "Falha ao editar transação");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const setTransactionData = (
    key: keyof IUpdateTransactionRequest,
    value: string | number
  ) => {
    setTransaction((prevData) => ({ ...prevData, [key]: value }));
  };

  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        onPress={closeBottomSheet}
        className=" w-full flex-row justify-between items-center"
      >
        <Text className="text-white text-xl font-bold">Editar transação</Text>
        <MaterialIcons name="close" size={20} color={colors.gray[700]} />
      </TouchableOpacity>
      <View className="flex-1 mt-8 mb-8">
        <TextInput
          value={transaction.description}
          placeholder="Descrição"
          placeholderTextColor={colors.gray[700]}
          onChangeText={(value) => setTransactionData("description", value)}
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6px] pl-4"
        />
        {validationErrors?.description && (
          <ErrorMessage>{validationErrors.description}</ErrorMessage>
        )}
        <CurrencyInput
          value={transaction.value}
          prefix="R$"
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          onChangeValue={(value) => setTransactionData("value", value ?? 0)}
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6px] pl-4"
        />
        {validationErrors?.value && (
          <ErrorMessage>{validationErrors.value}</ErrorMessage>
        )}
        <SelectCategoryModal
          selectedCategory={transaction.categoryId}
          onSelect={(categoryId) =>
            setTransactionData("categoryId", categoryId)
          }
        />
        {validationErrors?.categoryId && (
          <ErrorMessage>{validationErrors.categoryId}</ErrorMessage>
        )}
        <TransactionTypeSelector
          typeId={transaction.typeId}
          setTransactionType={(typeId) => setTransactionData("typeId", typeId)}
        />
        {validationErrors?.typeId && (
          <ErrorMessage>{validationErrors.typeId}</ErrorMessage>
        )}
        <View className="my-4">
          <AppButton onPress={handleUpdateTransaction}>
            {isLoading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              "Atualizar"
            )}
          </AppButton>
        </View>
      </View>
    </View>
  );
};
