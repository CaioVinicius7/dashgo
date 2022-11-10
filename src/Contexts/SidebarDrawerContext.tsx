import { createContext, ReactNode, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";

interface sidebarDrawerProviderProps {
  children: ReactNode;
}

type SidebarDrawerContextData = UseDisclosureReturn;

const sidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({
  children
}: sidebarDrawerProviderProps) {
  const disclosure = useDisclosure();
  const router = useRouter();

  const { onClose } = disclosure;

  useEffect(() => {
    onClose();
  }, [router.asPath, onClose]);

  return (
    <sidebarDrawerContext.Provider value={disclosure}>
      {children}
    </sidebarDrawerContext.Provider>
  );
}

export const useSidebarDrawer = () => useContext(sidebarDrawerContext);
