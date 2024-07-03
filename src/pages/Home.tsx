import { VStack } from "native-base";

import { Apolices } from "./Apolices";

export default function Home() {
  return (
    <>
      <VStack flex={1} justifyContent={"center"} alignItems={"center"}>
        <Apolices />
      </VStack>
    </>
  );
}
