import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Caio Vinícius</Text>
        <Text color="gray.300" fontSize="sm">
          caio1525pereira@gmail.com
        </Text>
      </Box>
      <Avatar
        size="md"
        name="Caio Vinícius"
        src="https://github.com/caiovinicius7.png"
      />
    </Flex>
  );
}
