import { Button, Icon, Text } from "@chakra-ui/react";
import { useDialog } from "../hooks";
import { ModalContainer } from "./global/ModalContainer";
import { TbHeartPlus } from "react-icons/tb";

export const Rest = () => {
  const { isOpenDialog, openDialog, closeDialog } = useDialog();

  return (
    <>
      <Button
        leftIcon={<Icon as={TbHeartPlus} boxSize={6} />}
        fontSize={25}
        onClick={openDialog}
        w="full"
        colorScheme="teal"
      >
        Rest
      </Button>

      <ModalContainer isOpen={isOpenDialog} onClose={closeDialog}>
        <Text>mimiendo...</Text>
      </ModalContainer>
    </>
  );
};
