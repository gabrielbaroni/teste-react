import { useEffect, useState } from "react";
import { Spinner, VStack } from "native-base";
import { useParams } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "../Api";
import ApoliceForm from "./ApoliceForm";

export default function ApoliceEdit() {
  const [loadApolices, setLoadApolices] = useState(true);
  const [apolice, setApolice] = useState();

  const { id } = useParams();

  console.log(" id ", id);

  const getApolice = async () => {
    setLoadApolices(true);
    axios
      .get(`${BASE_URL}/apolices/${id}`)
      .then((r: any) => {
        setApolice(r.data);
      })
      .finally(() => {
        setLoadApolices(false);
      });
  };

  // eslint-disable-next-line
  useEffect(() => {
    getApolice();
  }, []);

  return (
    <VStack flex={1} justifyContent={"center"} alignItems={"center"}>
      {loadApolices ? (
        <VStack>
          <Spinner size="lg" />
        </VStack>
      ) : (
        <VStack bg={"white"} p={20}>
          <ApoliceForm type={"edit"} title={`Editar dados da apólice ${id}`} dados={apolice} />
        </VStack>
      )}
    </VStack>
  );
}
