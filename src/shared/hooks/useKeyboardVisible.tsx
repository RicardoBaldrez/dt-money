import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export const useKeyboardVisible = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    // Quando o teclado aparece
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    })
    // Quando o teclado desaparece
    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    })

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    }
  }, []);

  return isKeyboardVisible;
}