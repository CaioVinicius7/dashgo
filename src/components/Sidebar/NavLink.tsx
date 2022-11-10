import { ElementType } from "react";
import Link from "next/link";
import {
  Icon,
  Link as ChakraLink,
  Text,
  LinkProps as ChakraLinkProps
} from "@chakra-ui/react";

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  href: string;
  children: string;
}

export function NavLink({ icon, href, children, ...props }: NavLinkProps) {
  return (
    <Link href={href}>
      <ChakraLink display="flex" alignItems="center" {...props}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </Link>
  );
}
