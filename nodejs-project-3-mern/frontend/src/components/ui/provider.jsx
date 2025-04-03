"use client";
import { ColorModeProvider } from "./color-mode";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export function Provider(props) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
