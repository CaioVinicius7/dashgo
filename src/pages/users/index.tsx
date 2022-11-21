import Head from "next/head";
import Link from "next/link";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { FiRefreshCcw } from "react-icons/fi";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

import { useUsers } from "../../services/hooks/useUsers";

export default function UserList() {
  const { data, isLoading, isFetching, refetch, error } = useUsers();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  return (
    <>
      <Head>
        <title>Dashgo | Usuários</title>
      </Head>
      <Box>
        <Header />

        <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
          <Sidebar />

          <Box flex="1" borderRadius={8} bg="gray.800" p="8">
            <Flex mb="8" justify="space-between" align="center">
              <Heading size="lg" fontWeight="normal">
                Usuários
                {!isLoading && isFetching && (
                  <Spinner size="sm" color="gray.500" ml="4" />
                )}
              </Heading>

              {!isFetching && (
                <IconButton
                  aria-label="Refetch users"
                  icon={<Icon as={FiRefreshCcw} />}
                  variant="unstyled"
                  display="flex"
                  alignItems="center"
                  mr="auto"
                  ml="2"
                  size="sm"
                  transition="0.2s"
                  _hover={{
                    filter: "brightness(0.8)"
                  }}
                  onClick={async () =>
                    await refetch({
                      queryKey: "users"
                    })
                  }
                />
              )}

              <Link href="/users/create">
                <Button
                  size="sm"
                  fontSize="sm"
                  cursor="pointer"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar novo
                </Button>
              </Link>
            </Flex>

            {isLoading ? (
              <Flex justify="center">
                <Spinner mt="12" />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text mt="12"> Falha ao obter dados dos usuários.</Text>
              </Flex>
            ) : (
              <>
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th px={["2", "4", "6"]} color="gray.600" w="8">
                        <Checkbox colorScheme="pink" />
                      </Th>
                      <Th>Usuário</Th>
                      {isWideVersion && <Th>Data de cadastro</Th>}

                      {isWideVersion && <Th w="8" />}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.map((user) => (
                      <Tr key={user.id}>
                        <Td px={["2", "4", "6"]} color="gray.600" w="8">
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{user.name}</Text>
                            <Text fontSize="sm" color="gray.300">
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.createdAt}</Td>}
                        {isWideVersion && (
                          <Td>
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              cursor="pointer"
                              colorScheme="purple"
                              leftIcon={
                                <Icon as={RiPencilLine} fontSize="16" />
                              }
                            >
                              Editar
                            </Button>
                          </Td>
                        )}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>

                <Pagination
                  totalCountOfRegisters={200}
                  currentPage={5}
                  onPageChange={() => {}}
                />
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
}
