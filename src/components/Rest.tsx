import {
  Button,
  Flex,
  Icon,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useDialog } from "../hooks";
import { ModalContainer } from "./global/ModalContainer";
import { TbHeartPlus } from "react-icons/tb";
import { useCharacterState } from "../store";
import { useRest } from "../hooks/useRest";
import { FC, useEffect } from "react";

export const Rest = () => {
  const { phase, life } = useCharacterState((state) => state);

  const { isOpenDialog, openDialog, closeDialog } = useDialog();
  const { isResting, rest, restIsEnded } = useRest();

  useEffect(() => {
    if (phase === 5) closeDialog();
  }, [phase]);

  useEffect(() => {
    if (restIsEnded) {
      closeDialog();
    }
  }, [restIsEnded]);

  const isDisabled = life >= 100;

  return (
    <>
      <Button
        disabled={isDisabled}
        leftIcon={<Icon as={TbHeartPlus} boxSize={6} />}
        fontSize={25}
        onClick={!isDisabled ? openDialog : () => null}
        w="full"
        colorScheme="teal"
      >
        Rest
      </Button>

      <ModalContainer
        isOpen={isOpenDialog}
        onClose={!isResting ? closeDialog : () => null}
      >
        {isResting ? (
          <Flex
            justifyContent="center"
            mb={5}
            gap={2}
            fontSize={32}
            alignItems="center"
          >
            <Spinner color="real" />
            <Text>Mimiendo...</Text>
          </Flex>
        ) : (
          <UnorderedList mb={5}>
            <ListItem>Aumentaras algunos puntos de vida</ListItem>
            <ListItem>Luego de descansar avanzaras una fase</ListItem>
          </UnorderedList>
        )}

        <Button
          disabled={isDisabled || isResting}
          onClick={rest}
          w="full"
          colorScheme="teal"
        >
          Descansar
        </Button>
      </ModalContainer>
    </>
  );
};
