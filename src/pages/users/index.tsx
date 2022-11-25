import { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import NextLink from "next/link";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
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

import { getUsers, User, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, refetch, error } = useUsers(page, {
    initialData: users
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ["user", userId],
      async () => {
        const response = await api.get(`/users/${userId}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10 // 10 minutes
      }
    );
  }

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

              <NextLink href="/users/create">
                <Button
                  size="sm"
                  fontSize="sm"
                  cursor="pointer"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar novo
                </Button>
              </NextLink>
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
                    {data?.users.map((user) => (
                      <Tr key={user.id}>
                        <Td px={["2", "4", "6"]} color="gray.600" w="8">
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Link
                              color="purple.500"
                              onMouseEnter={() => handlePrefetchUser(user.id)}
                            >
                              <Text fontWeight="bold">{user.name}</Text>
                            </Link>
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
                  totalCountOfRegisters={data!.totalCount}
                  currentPage={page}
                  onPageChange={setPage}
                />
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { users } = await getUsers(1);

  return {
    props: {
      users
    }
  };
};
