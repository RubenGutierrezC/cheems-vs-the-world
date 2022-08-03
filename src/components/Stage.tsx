import { Text } from "@chakra-ui/react";
import { useCharacterState } from "../store";

export const Stage = () => {
  const { stage, phase } = useCharacterState((state) => state);

  return (
    <>
      <Text>
        Stage: {stage} - phase {phase} / 5
      </Text>
    </>
  );
};
