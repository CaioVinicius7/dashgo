import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack
} from "@chakra-ui/react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "react-query";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Form/Input";

import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const createUserFormSchema = yup.object({
  name: yup.string().required("Nome obrigatório"),
  email: yup
    .string()
    .required("E-mail obrigatório")
    .email("Digite um e-mail válido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "No mínimo 6 caracteres"),
  passwordConfirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais")
});

export default function CreateUser() {
  const router = useRouter();

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post("/users", {
        user: {
          ...user,
          created_at: new Date()
        }
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      }
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    },
    resolver: yupResolver(createUserFormSchema)
  });

  const handleCreateUser: SubmitHandler<FieldValues> = async (values: any) => {
    await createUser.mutateAsync(values);

    router.push("/users");
  };

  return (
    <>
      <Head>
        <title>Dashgo | Criar Usuário</title>
      </Head>
      <Box>
        <Header />

        <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
          <Sidebar />

          <Box
            as="form"
            flex="1"
            borderRadius={8}
            bg="gray.800"
            p={["6", "8"]}
            onSubmit={handleSubmit(handleCreateUser)}
          >
            <Heading size="lg" fontWeight="normal">
              Criar usuário
            </Heading>

            <Divider my="6" borderColor="gray.700" />

            <VStack spacing={["6", "8"]}>
              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <Input
                  label="Nome completo"
                  error={errors.name}
                  {...register("name")}
                />

                <Input
                  type="email"
                  label="E-mail"
                  error={errors.email}
                  {...register("email")}
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <Input
                  type="password"
                  label="Senha"
                  error={errors.password}
                  {...register("password")}
                />

                <Input
                  type="password"
                  label="Confirmação da senha"
                  error={errors.passwordConfirmation}
                  {...register("passwordConfirmation")}
                />
              </SimpleGrid>
            </VStack>

            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
                <Link href="/users">
                  <Button colorScheme="whiteAlpha" disabled={isSubmitting}>
                    Cancelar
                  </Button>
                </Link>

                <Button
                  type="submit"
                  colorScheme="pink"
                  isLoading={isSubmitting}
                >
                  Salvar
                </Button>
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
