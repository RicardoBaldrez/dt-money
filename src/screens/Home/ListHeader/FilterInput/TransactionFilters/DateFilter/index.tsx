import { useState } from "react"
import { format, isValid } from "date-fns"
import { View, TouchableOpacity, Text } from "react-native"
import DateTimePicker from "react-native-modal-datetime-picker"
import { useTransactionContext } from "@/context"
import { ptBR } from "date-fns/locale";
import clsx from "clsx";

export const DateFilter = () => {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const { filters, handleFilters } = useTransactionContext();

  const onStartCancel = () => {
    setShowStartDatePicker(false);
  }

  const onStartConfirm = (date: Date) => {
    setShowStartDatePicker(false);
    handleFilters({ key: "from", value: date });
  }

  const onEndCancel = () => {
    setShowEndDatePicker(false);
  }

  const onEndConfirm = (date: Date) => {
    setShowEndDatePicker(false);
    handleFilters({ key: "to", value: date });
  }

  const formatDate = (date?: Date) => {
    if (!date || !isValid(date)) return undefined
    return format(date, "dd/MM/yyyy", { locale: ptBR });
  }

  return (
    <>
      <Text className="text-gray-700 text-lg mb-6">Data</Text>
      <View className="flex-row justify-between mb-6">
        <View className="w-[48%]">
          <TouchableOpacity onPress={() => setShowStartDatePicker(true)} className="rounded-md p-2 border-b border-gray-800">
            <Text className={clsx('text-lg',  filters.from ? 'text-white' : 'text-gray-700')}>{formatDate(filters.from) || "De"}</Text>
          </TouchableOpacity>
        </View>
        <View className="w-[48%]">
          <TouchableOpacity onPress={() => setShowEndDatePicker(true)} className="rounded-md p-2 border-b border-gray-800">
            <Text className={clsx('text-lg', filters.to ? 'text-white' : 'text-gray-700')}>{formatDate(filters.to) || "Até"}</Text>
          </TouchableOpacity>
        </View>
        <DateTimePicker
          isVisible={showStartDatePicker}
          date={filters.from }
          onCancel={onStartCancel}
          onConfirm={onStartConfirm}
          mode="date"
          confirmTextIOS="Confirmar"
          cancelTextIOS="Cancelar"
          locale="pt_BR"
        />
        <DateTimePicker
          isVisible={showEndDatePicker}
          date={filters.to}
          onCancel={onEndCancel}
          onConfirm={onEndConfirm}
          mode="date"
          confirmTextIOS="Confirmar"
          cancelTextIOS="Cancelar"
          locale="pt_BR"
        />
      </View>
    </>
  )
}