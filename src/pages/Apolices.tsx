import { useEffect, useState } from "react";
import { Spinner, Text, VStack } from "native-base";
import axios from "axios";

import ApoliceList from "../components/ApoliceList";
import ApoliceForm from "../components/ApoliceForm";
import { BASE_URL } from "../Api";

export const Apolices = () => {
  const [apolices, setApolices] = useState<any>([]);
  const [loadApolices, setLoadApolices] = useState(true);

  const getApolices = async () => {
    setLoadApolices(true);
    axios
      .get(`${BASE_URL}/apolices`)
      .then((r) => {
        setApolices(r.data);
      })
      .finally(() => {
        setLoadApolices(false);
      });
  };

  useEffect(() => {
    getApolices();
  }, []);

  return (
    <>
      <VStack flexDir={"row"} bg={"white"} p={20} mt={20} mb={50} w={"90%"} borderRadius={20}>
        <VStack flex={1} mr={10}>
          <Text textTransform={"uppercase"} fontWeight={"800"} fontSize={24}>
            Apolices
          </Text>
          {loadApolices ? <Spinner size="lg" /> : <ApoliceList data={apolices} key={1} />}
        </VStack>

        <VStack flex={1}>
          <ApoliceForm type={"create"} title={"Cadastre uma apólice"} />
        </VStack>
      </VStack>
    </>
  );
};
