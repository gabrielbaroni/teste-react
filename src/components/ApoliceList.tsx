import { PencilLine, Trash } from "@phosphor-icons/react";
import { Box, HStack, IconButton, Spacer, Text, VStack, FlatList } from "native-base";
import axios from "axios";

import { BASE_URL } from "../Api";

export default function ApoliceList(props: any) {
  const handleEdit = (id: string) => {
    window.location.href = `/apolices/${id}`;
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Gostaria de deletar essa apólice?")) {
      axios.delete(`${BASE_URL}/apolices/${id}`).then((r) => {
        window.location.href = "/";
      });
    }
  };

  return (
    <FlatList
      data={props.data}
      renderItem={({ item }: any) => (
        <Box key={item.id} borderBottomWidth="1" borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
          <HStack justifyContent="space-between">
            <VStack flex={1}>
              <Text color="coolGray.800">Número: {item.numero}</Text>
              <Text color="coolGray.600">Valor Prêmio: {item.valor_premio}</Text>
            </VStack>
            <Spacer />
            <VStack flex={1} ml={5}>
              <Text fontSize="xs" color="coolGray.800" alignSelf="flex-start">
                {item.segurado.nome} - {item.segurado.email} - {item.segurado.cpf_cnpj}
              </Text>
              <VStack flexDir={"row"} mt={5} space={10}>
                <IconButton onPress={() => handleEdit(item.id)} icon={<PencilLine size={25} />} />
                <IconButton onPress={() => handleDelete(item.id)} icon={<Trash size={25} />} />
              </VStack>
            </VStack>
          </HStack>
        </Box>
      )}
      ListEmptyComponent={<Text>Nenhuma apólice encontrada.</Text>}
      keyExtractor={(item: any, index) => item.id}
    />
  );
}
