import { type FC, type PropsWithChildren } from 'react';
import { Text, TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { clsx } from 'clsx';

import { colors } from '@/shared/colors';

type AppButtonMode = 'fill' | 'outline';

interface AppButtonParams extends TouchableOpacityProps {
  mode?: AppButtonMode;
  iconName?: keyof typeof MaterialIcons.glyphMap;
}

export const AppButton: FC<PropsWithChildren<AppButtonParams>> = ({
  children,
  mode = 'fill',
  iconName,
  ...rest
}) => {
  const isFill = mode === 'fill';

  return (
    <TouchableOpacity
      {...rest}
      className={clsx(
        'h-button w-full flex-row items-center rounded-xl px-5',
        iconName ? 'justify-between' : 'justify-center',
        { 'bg-accent-brand': isFill, 'border-[1px] border-accent-brand bg-none': !isFill },
      )}
    >
      <Text className={clsx('text-base', { 'text-white': isFill, 'text-accent-brand': !isFill })}>
        {children}
      </Text>
      {iconName && (
        <MaterialIcons
          name={iconName}
          size={24}
          color={isFill ? colors.white : colors['accent-brand']}
        />
      )}
    </TouchableOpacity>
  );
};
