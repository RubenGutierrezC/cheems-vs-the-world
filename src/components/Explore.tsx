import { Button, Icon, Text } from "@chakra-ui/react";
import { ModalContainer } from "./global/ModalContainer";
import { useDialog } from "../hooks/useDialog";
import { TbViewfinder } from "react-icons/tb";

export const Explore = () => {
  const { isOpenDialog, openDialog, closeDialog } = useDialog();

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

      <ModalContainer isOpen={isOpenDialog} onClose={closeDialog}>
        <Text>explorando...</Text>
      </ModalContainer>
    </>
  );
};
