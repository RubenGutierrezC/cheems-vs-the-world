import {
  Button,
  Flex,
  Icon,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { ModalContainer } from "./global/ModalContainer";
import { useDialog } from "../hooks/useDialog";
import { TbSword } from "react-icons/tb";
import { useTrain } from "../hooks/useTrain";
import { useEffect } from "react";
import { useCharacterState } from "../store/characterState";

export const TrainAtack = () => {
  const { phase } = useCharacterState((state) => state);

  const { isOpenDialog, openDialog, closeDialog } = useDialog();
  const { isTraining, trainIsEnded, trainAttack } = useTrain();

  useEffect(() => {
    if (phase === 5) closeDialog();
  }, [phase]);

  useEffect(() => {
    if (trainIsEnded) {
      closeDialog();
    }
  }, [trainIsEnded]);

  return (
    <>
      <Button
        leftIcon={<Icon as={TbSword} boxSize={6} />}
        fontSize={25}
        onClick={openDialog}
        w="full"
        colorScheme="red"
      >
        Train attack
      </Button>

      <ModalContainer
        isOpen={isOpenDialog}
        onClose={!isTraining ? closeDialog : () => null}
      >
        {isTraining ? (
          <Flex
            justifyContent="center"
            mb={5}
            gap={2}
            fontSize={32}
            alignItems="center"
          >
            <Spinner color="red.500" />
            <Text>Entrenando...</Text>
          </Flex>
        ) : (
          <UnorderedList mb={5}>
            <ListItem>
              {" "}
              Aumentaras los puntos de ataque pero perderas algunos puntos de
              vida
            </ListItem>
            <ListItem>Luego de entrenar avanzaras una fase</ListItem>
          </UnorderedList>
        )}

        <Button
          disabled={isTraining}
          onClick={trainAttack}
          w="full"
          colorScheme="red"
        >
          Entrenar ataque
        </Button>
      </ModalContainer>
    </>
  );
};
