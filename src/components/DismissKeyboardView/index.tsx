import { FC, PropsWithChildren } from "react";
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// SafeAreaView: 
  // Componente que garante que o conteúdo seja renderizado apenas nas áreas seguras da tela
  // evitando sobreposição.
// KeyboardAvoidingView:
  // Componente que automaticamente ajusta a posição do conteúdo quando o teclado aparece,
  // evitando que inputs fiquem escondidos atrás do teclado.
// TouchableWithoutFeedback:
  // Componente que permite dismissar o teclado ao tocar fora do input.

export const DismissKeyboardView: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior="padding" className="flex-1 ">
          <ScrollView>
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
