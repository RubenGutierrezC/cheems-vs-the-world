import React, { FC } from "react";
import { ModalContainer } from "../global/ModalContainer";
import { useCharacterState } from "../../store/characterState";
import { useDialog } from "../../hooks/useDialog";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const BossFight = () => {
  const { phase } = useCharacterState((state) => state);
  const [audio] = useState(() => new Audio("sounds/fight-sound-1.mp3"));

  const { openDialog, closeDialog, isOpenDialog } = useDialog();

  useEffect(() => {
    if (phase === 5) {
      openDialog();
    }
  }, [phase]);

  // useEffect(() => {
  //   const audio = new Audio("sounds/fight-sound-1.mp3");
  //   audio.play();

  //   return () => {
  //     audio.pause();
  //   };
  // }, []);

  const playAudio = () => {
    audio.play();
  };

  const handleClose = () => {
    audio.pause();
    closeDialog();
  };

  return (
    <ModalContainer isOpen={isOpenDialog} onClose={handleClose}>
      <Flex alignItems="center">
        <Image
          src="assets/cheems-base.png"
          alt="Character render"
          w="45%"
          objectFit="cover"
        />
        <Text fontSize={30} w="10%">
          vs
        </Text>
        <Image
          src="assets/dark-cheems.png"
          alt="Character render"
          w="45%"
          objectFit="cover"
        />
      </Flex>
      <Button onClick={playAudio} width="full">
        Start battle
      </Button>
    </ModalContainer>
  );
};
