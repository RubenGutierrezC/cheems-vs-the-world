import { Button, Icon, Text } from "@chakra-ui/react";
import { useDialog } from "../hooks";
import { ModalContainer } from "./global/ModalContainer";
import { TbShield } from "react-icons/tb";

export const TrainDefense = () => {
  const { isOpenDialog, openDialog, closeDialog } = useDialog();

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

      <ModalContainer isOpen={isOpenDialog} onClose={closeDialog}>
        <Text>defemdiendo...</Text>
      </ModalContainer>
    </>
  );
};
