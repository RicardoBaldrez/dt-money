import { useState } from "react"
import { format } from "date-fns"
import { View, TouchableOpacity, Text } from "react-native"
import DateTimePicker from "react-native-modal-datetime-picker"

export const DateFilter = () => {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const onStartCancel = () => {
    setShowStartDatePicker(false);
  }

  const onStartConfirm = (date: Date) => {
    setShowStartDatePicker(false);
  }

  const onEndCancel = () => {
    setShowEndDatePicker(false);
  }

  const onEndConfirm = (date: Date) => {
    setShowEndDatePicker(false);
  }
  return (
    <>
      <Text className="text-gray-700 text-lg">Data</Text>
      <View className="flex-row justify-between mb-6">
        <View className="w-[48%]">
          <TouchableOpacity onPress={() => setShowStartDatePicker(true)} className="rounded-md p-2 border-b border-gray-800">
            <Text className="text-white text-lg">{format(new Date(), 'dd/MM/yyyy')}</Text>
          </TouchableOpacity>
        </View>
        <View className="w-[48%]">
          <TouchableOpacity onPress={() => setShowEndDatePicker(true)} className="rounded-md p-2 border-b border-gray-800">
            <Text className="text-white text-lg">{format(new Date(), 'dd/MM/yyyy')}</Text>
          </TouchableOpacity>
        </View>
        <DateTimePicker
          isVisible={showStartDatePicker}
          date={new Date()}
          onCancel={onStartCancel}
          onConfirm={onStartConfirm}
          mode="date"
          confirmTextIOS="Confirmar"
          cancelTextIOS="Cancelar"
          locale="pt_BR"
        />
        <DateTimePicker
          isVisible={showEndDatePicker}
          date={new Date()}
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