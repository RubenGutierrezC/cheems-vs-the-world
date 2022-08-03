import { Button, Icon, Text } from "@chakra-ui/react";
import { ModalContainer } from "./global/ModalContainer";
import { useDialog } from "../hooks/useDialog";
import { TbSword } from "react-icons/tb";
import { useTrain } from "../hooks/useTrain";
import { useEffect } from "react";
import { useCharacterState } from "../store/characterState";

export const TrainAtack = () => {
  const { phase } = useCharacterState((state) => state);

  const { isOpenDialog, openDialog, closeDialog } = useDialog();
  const { trainAttack } = useTrain();

  useEffect(() => {
    if (phase === 5) closeDialog();
  }, [phase]);

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

      <ModalContainer isOpen={isOpenDialog} onClose={closeDialog}>
        <Text>peleamdo...</Text>
        <Button onClick={trainAttack}>entrenar ataque</Button>
      </ModalContainer>
    </>
  );
};
