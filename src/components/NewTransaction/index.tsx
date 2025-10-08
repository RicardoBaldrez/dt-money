import { useState } from "react";
import { View, TouchableOpacity, Text, TextInput } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { MaterialIcons } from "@expo/vector-icons";
import * as Yup from "yup";

import { colors } from "@/shared/colors";
import { ICreateTransactionRequest } from "@/shared/interfaces/https/createTransactionRequest";
import { useBottomSheetContext } from "@/context";
import { TransactionTypeSelector } from "../SelectType";
import { SelectCategoryModal } from "../SelectCategoryModal";
import { transactionSchema } from "./schema";
import { AppButton } from "../AppButton";

type ValidationErrorsTypes = Record<keyof ICreateTransactionRequest, string>;

export const NewTransaction = () => {
  const { closeBottomSheet } = useBottomSheetContext();
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrorsTypes>();

  const [transaction, setTransaction] = useState<ICreateTransactionRequest>({
    description: "",
    typeId: 0,
    categoryId: 0,
    value: 0,
  });

  const handleCreatetransaction = async () => {
    try {
      await transactionSchema.validate(transaction, {
        abortEarly: false,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {} as ValidationErrorsTypes;

        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof ICreateTransactionRequest] = err.message;
          }
        });

        setValidationErrors(errors);
      }
    }
  };

  const setTransactionData = (
    key: keyof ICreateTransactionRequest,
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
        <Text className="text-white text-xl font-bold">Nova transação</Text>
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
        <SelectCategoryModal
          selectedCategory={transaction.categoryId}
          onSelect={(categoryId) =>
            setTransactionData("categoryId", categoryId)
          }
        />
        <TransactionTypeSelector
          typeId={transaction.typeId}
          setTransactionType={(typeId) => setTransactionData("typeId", typeId)}
        />
        <View className="my-4">
          <AppButton onPress={handleCreatetransaction}>Registrar</AppButton>
        </View>
      </View>
    </View>
  );
};
