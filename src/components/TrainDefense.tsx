import { useEffect } from "react";
import {
  Button,
  Flex,
  Icon,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useDialog, useTrain } from "../hooks";
import { ModalContainer } from "./global/ModalContainer";
import { TbShield } from "react-icons/tb";
import { useCharacterState } from "../store";

export const TrainDefense = () => {
  const { phase } = useCharacterState((state) => state);

  const { isOpenDialog, openDialog, closeDialog } = useDialog();
  const { isTraining, trainIsEnded, trainDefense } = useTrain();

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
        leftIcon={<Icon as={TbShield} boxSize={6} />}
        fontSize={25}
        onClick={openDialog}
        w="full"
        colorScheme="blue"
      >
        Train Defense
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
            <Spinner color="blue" />
            <Text>Entrenando...</Text>
          </Flex>
        ) : (
          <UnorderedList mb={5}>
            <ListItem>
              {" "}
              Aumentaras los puntos de defensa pero perderas algunos puntos de
              vida
            </ListItem>
            <ListItem>Luego de entrenar avanzaras una fase</ListItem>
          </UnorderedList>
        )}

        <Button
          disabled={isTraining}
          onClick={trainDefense}
          w="full"
          colorScheme="blue"
        >
          Entrenar defensa
        </Button>
      </ModalContainer>
    </>
  );
};
