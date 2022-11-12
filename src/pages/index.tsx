import Head from "next/head";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Button, Flex, Stack } from "@chakra-ui/react";

import { Input } from "../components/Form/Input";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const handleSignIn: SubmitHandler<FieldValues> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(values);
  };

  return (
    <>
      <Head>
        <title>Dashgo | Login</title>
      </Head>
      <Flex w="100wh" h="100vh" align="center" justify="center">
        <Flex
          as="form"
          w="100%"
          maxW="360px"
          bg="gray.800"
          p="8"
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="4">
            <Input
              label="E-mail"
              type="email"
              error={errors.email}
              {...register("email", {
                required: "E-mail obrigatório"
              })}
            />

            <Input
              label="Senha"
              type="password"
              error={errors.password}
              {...register("password", { required: "Senha obrigatória" })}
            />
          </Stack>

          <Button
            type="submit"
            mt="6"
            colorScheme="pink"
            size="lg"
            isLoading={isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
