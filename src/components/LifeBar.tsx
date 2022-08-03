import { Flex, Icon, Progress, Text } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { SiDogecoin } from "react-icons/si";
import { useCharacterState } from "../store";

export const LifeBar = () => {
  const { coins, life } = useCharacterState((state) => state);

  return (
    <>
      {/* coins */}
      <Flex gap={2} alignItems="center" mb={2}>
        <Icon as={SiDogecoin} boxSize={5} color="yellow.500" />
        <Text fontSize={22}>{coins}</Text>
      </Flex>

      {/* life */}
      <Flex gap={2} alignItems="center" mb={2}>
        <Icon as={AiFillHeart} boxSize={5} color="green.400" />
        <Text fontSize={22}>{life} / 100</Text>
      </Flex>

      <Progress value={life} colorScheme="green" borderRadius="md" h={5} />
    </>
  );
};
