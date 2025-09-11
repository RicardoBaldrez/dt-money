import { TextInputProps, View, Text, TouchableOpacity, TextInput } from "react-native";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";

interface AppInputParams<T extends FieldValues> extends TextInputProps {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
}

export const AppInput = <T extends FieldValues>({
  control,
  name,
  label,
  leftIconName,
  ...rest
}: AppInputParams<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <View className="w-full">
            {label && <Text className="text-white">{label}</Text>}
            <TouchableOpacity className="flex-row items-center justify-between border-b-[1px] border-gray-600 px-3 py-2 h-16">
              <TextInput value={value} onChangeText={onChange} {...rest} placeholderTextColor={colors.gray[700]} />
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};
