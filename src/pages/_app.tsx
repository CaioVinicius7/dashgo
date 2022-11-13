import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { SidebarDrawerProvider } from "../Contexts/SidebarDrawerContext";

import { theme } from "../styles/theme";

import { makeServer } from "../services/mirage";

if(process.env.NODE_ENV === "development") {
  makeServer();
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
        <Component {...pageProps} />
      </SidebarDrawerProvider>
    </ChakraProvider>
  );
}
