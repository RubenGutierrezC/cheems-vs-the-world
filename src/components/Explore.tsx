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
import { TbViewfinder } from "react-icons/tb";
import { useCharacterState } from "../store";
import { useEffect } from "react";
import { useExplore } from "../hooks/useExplore";

export const Explore = () => {
  const { phase } = useCharacterState((state) => state);

  const { isOpenDialog, openDialog, closeDialog } = useDialog();
  const { isExploring, explore, exploreIsEnded, showText, resetExplore } =
    useExplore();

  useEffect(() => {
    if (phase === 5) handleClose();
  }, [phase]);

  const handleClose = () => {
    closeDialog();
    resetExplore();
  };

  return (
    <>
      <Button
        leftIcon={<Icon as={TbViewfinder} boxSize={6} />}
        fontSize={25}
        onClick={openDialog}
        w="full"
        colorScheme="yellow"
      >
        Explore
      </Button>

      <ModalContainer
        isOpen={isOpenDialog}
        onClose={!isExploring ? handleClose : () => null}
      >
        {exploreIsEnded ? (
          <>
            <Text mb={3}>{showText}</Text>
          </>
        ) : (
          <>
            {isExploring ? (
              <Flex
                justifyContent="center"
                mb={5}
                gap={2}
                fontSize={32}
                alignItems="center"
              >
                <Spinner color="real" />
                <Text>Explorando...</Text>
              </Flex>
            ) : (
              <UnorderedList mb={5}>
                <ListItem>
                  Explorando podras ganar o perder ataque y defensa, podras
                  perder vida, también podras ganar o perder monedas
                </ListItem>
                <ListItem>Luego de descansar avanzaras una fase</ListItem>
              </UnorderedList>
            )}
          </>
        )}

        <Button
          disabled={isExploring}
          onClick={exploreIsEnded ? handleClose : explore}
          w="full"
          colorScheme="teal"
        >
          {exploreIsEnded ? "Cerrar" : "Explorar"}
        </Button>
      </ModalContainer>
    </>
  );
};
