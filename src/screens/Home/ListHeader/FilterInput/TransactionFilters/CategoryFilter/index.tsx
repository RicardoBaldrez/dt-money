import { View, Text, TouchableOpacity } from "react-native";
import { useTransactionContext } from "@/context";
import Checkbox from "expo-checkbox";

export const CategoryFilter = () => {
  const { categories, handleCategoryFilter, filters } = useTransactionContext();

  return (
    <View className="mb-6">
      <Text className="text-base font-medium mb-5 text-gray-600">Categorias</Text>
      {
        categories.map(({ id, name }) => (
          <TouchableOpacity key={`category-${id}`} onPress={() => handleCategoryFilter(id)} className="flex-row items-center py-2">
            <Checkbox value={filters.categoryIds[id]} onValueChange={() => handleCategoryFilter(id)} className="mr-4" />
            <Text className="text-white text-lg">{name}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}