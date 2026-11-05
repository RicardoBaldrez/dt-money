import { useRef, useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type TextInputInstance,
  type TextInputProps,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import clsx from 'clsx';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';

import { colors } from '@/shared/colors';

interface AppInputParams<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
  label?: string;
}

export const AppInput = <T extends FieldValues>({
  control,
  name,
  label,
  leftIconName,
  secureTextEntry,
  ...rest
}: AppInputParams<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(secureTextEntry);
  const inputRef = useRef<TextInputInstance>(null);

  const checkFocus = () => {
    if (inputRef.current) {
      setIsFocused(inputRef.current.isFocused());
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <View className="mt-4 w-full">
            {label && (
              <Text
                className={clsx(
                  'mb-2 mt-3 text-base',
                  isFocused ? 'text-accent-brand' : 'text-gray-600',
                )}
              >
                {label}
              </Text>
            )}
            <TouchableOpacity
              className={clsx(
                'h-16 flex-row items-center justify-between border-b-[1px]  px-3 py-2',
                isFocused ? 'border-accent-brand' : 'border-gray-600',
              )}
            >
              {leftIconName && (
                <MaterialIcons
                  name={leftIconName}
                  color={clsx(isFocused ? colors['accent-brand'] : colors.gray['600'])}
                  size={24}
                  className="mr-2"
                />
              )}
              <TextInput
                value={value}
                onChangeText={onChange}
                className="flex-1 text-base text-gray-500"
                placeholderTextColor={colors.gray['700']}
                ref={inputRef}
                onFocus={checkFocus}
                onEndEditing={checkFocus}
                secureTextEntry={showPassword}
                {...rest}
              />
              {secureTextEntry && (
                <TouchableOpacity onPress={() => setShowPassword((value) => !value)}>
                  <MaterialIcons
                    name={showPassword ? 'visibility' : 'visibility-off'}
                    color={colors.gray['600']}
                    size={24}
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};
