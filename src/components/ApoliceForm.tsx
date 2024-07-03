import { useEffect } from "react";
import { Input, VStack, Text, Button, InputGroup, InputLeftAddon } from "native-base";
import { useForm } from "react-hook-form";
import axios from "axios";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL } from "../Api";

export default function ApoliceForm(props: any) {
  const formOptions = {
    resolver: yupResolver(
      Yup.object().shape({
        id: Yup.string(),
        numero: Yup.string().required("Informe um número."),
        valor_premio: Yup.string().required("Informe um valor do prêmio."),
        segurado: Yup.object().shape({
          nome: Yup.string(),
          email: Yup.string(),
          cpf_cnpj: Yup.string(),
        }),
        coberturas: Yup.object().shape({
          nome: Yup.string(),
          valor: Yup.string(),
        }),
      })
    ),
  };

  // eslint-disable-next-line
  const {
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = () => {
    const formData = getValues();

    if (props.type === "create") {
      formData.id = (Math.floor(Math.random() * 999999) + 1).toString();
      axios.post(`${BASE_URL}/apolices`, formData).then((r) => {
        window.location.href = "/";
      });
    }
    if (props.type === "edit") {
      axios.put(`${BASE_URL}/apolices/${props.dados.id}`, formData).then((r) => {
        window.location.href = "/";
      });
    }
  };

  useEffect(() => {
    setValue("numero", props?.dados?.numero);
    setValue("valor_premio", props?.dados?.valor_premio);
    setValue("segurado.nome", props?.dados?.segurado.nome);
    setValue("segurado.email", props?.dados?.segurado.email);
    setValue("segurado.cpf_cnpj", props?.dados?.segurado.cpf_cnpj);
    setValue("coberturas.nome", props?.dados?.coberturas.nome);
    setValue("coberturas.valor", props?.dados?.valor);
  }, [props]);

  return (
    <VStack w={"100%"}>
      <Text textTransform={"uppercase"} fontWeight={"800"} fontSize={24}>
        {props.title}
      </Text>
      <Text>Informe corretamente os dados abaixo:</Text>
      <VStack mt={7}>
        <Input variant="underlined" placeholder={props?.dados?.numero || "Número da apólice"} onChangeText={(e) => setValue("numero", e)} />
        {errors && errors.numero && <Text style={{ color: "red" }}>{errors.numero.message?.toString()}</Text>}
      </VStack>
      <VStack mt={5}>
        <Input variant="underlined" placeholder={props?.dados?.valor_premio || "Valor do prêmio"} onChangeText={(e) => setValue("valor_premio", e)} />
        {errors && errors.valor_premio && <Text style={{ color: "red" }}>{errors.valor_premio.message?.toString()}</Text>}
      </VStack>
      <VStack mt={5}>
        <Input variant="underlined" placeholder={props?.dados?.segurado?.nome || "Nome do segurado"} onChangeText={(e) => setValue("segurado.nome", e)} />
        {errors && errors.segurado?.nome && <Text style={{ color: "red" }}>{errors.segurado?.nome.message?.toString()}</Text>}
      </VStack>
      <VStack mt={5}>
        <Input variant="underlined" placeholder={props?.dados?.segurado?.email || "E-mail do segurado"} onChangeText={(e) => setValue("segurado.email", e)} />
        {errors && errors.segurado?.email && <Text style={{ color: "red" }}>{errors.segurado?.email.message?.toString()}</Text>}
      </VStack>
      <VStack mt={5}>
        <Input variant="underlined" placeholder={props?.dados?.segurado?.cpf_cnpj || "CPF do segurado"} onChangeText={(e) => setValue("segurado.cpf_cnpj", e)} />
        {errors && errors.segurado?.cpf_cnpj && <Text style={{ color: "red" }}>{errors.segurado?.cpf_cnpj.message?.toString()}</Text>}
      </VStack>
      <VStack mt={5}>
        <Text textTransform={"uppercase"}>coberturas</Text>
        <VStack mt={5} flexDir={"row"}>
          <Input type="text" placeholder={props?.dados?.coberturas?.nome} mr={0} onChangeText={(e) => setValue("coberturas.nome", e)} />
          <InputGroup w={{ base: "50%", md: "285" }}>
            <InputLeftAddon children={"R$"} />
            <Input w={{ base: "50%", md: "211" }} placeholder={props?.dados?.coberturas?.valor} onChangeText={(e) => setValue("coberturas.valor", e)} />
          </InputGroup>
        </VStack>
      </VStack>

      <VStack mt={5} textAlign={"center"}>
        <Button onPress={handleSubmit(onSubmit)} bg={"#3ea110"} _hover={{ background: "#3ea110c4" }}>
          {props.type === "edit" ? <Text color={"white"}>Editar apólice</Text> : <Text color={"white"}>Cadastrar apólice</Text>}
        </Button>
        {props.type === "edit" && (
          <VStack mt={5}>
            <a href="/">Voltar</a>
          </VStack>
        )}
      </VStack>
    </VStack>
  );
}
