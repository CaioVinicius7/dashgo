import { Box, Button, Stack, Text } from "@chakra-ui/react";

export function Pagination() {
  return (
    <Stack
      direction="row"
      mt="8"
      align="center"
      justify="space-between"
      spacing="6"
    >
      <Box>
        <Text as="strong">0</Text> - <Text as="strong">10</Text> de
        <Text as="strong">100</Text>
      </Box>

      <Stack direction="row" spacing="2">
        <Button
          size="sm"
          fontSize="xs"
          w="4"
          colorScheme="pink"
          disabled
          _disabled={{
            bgColor: "pink.500",
            cursor: "default"
          }}
        >
          1
        </Button>

        <Button
          size="sm"
          fontSize="xs"
          w="4"
          bg="gray.700"
          _hover={{
            bg: "gray.500"
          }}
        >
          2
        </Button>

        <Button
          size="sm"
          fontSize="xs"
          w="4"
          bg="gray.700"
          _hover={{
            bg: "gray.500"
          }}
        >
          3
        </Button>

        <Button
          size="sm"
          fontSize="xs"
          w="4"
          bg="gray.700"
          _hover={{
            bg: "gray.500"
          }}
        >
          4
        </Button>
      </Stack>
    </Stack>
  );
}
