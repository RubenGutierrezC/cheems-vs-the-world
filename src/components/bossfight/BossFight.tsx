import { useEffect, useState } from "react";
import { ModalContainer } from "../global/ModalContainer";
import { useCharacterState } from "../../store/characterState";
import { useDialog } from "../../hooks/useDialog";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Progress,
  Text,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { bosses } from "../../constants/trainParams";
import { getRandomNumber } from "../../utils";
import { FightResult } from "./FightResult";

interface FightHistory {
  isBoss: boolean;
  characterName: string;
  damageToLife: number;
}

export const BossFight = () => {
  const {
    adventureIsOver,
    life,
    increaseLife,
    attackPoints,
    phase,
    endAdventure,
  } = useCharacterState((state) => state);
  const { closeDialog, openDialog, isOpenDialog } = useDialog();

  const [boss, setBoss] = useState(() => bosses[0]);

  const [fightHistory, setFightHistory] = useState<FightHistory[]>([]);

  const [fightStarted, setFightStarted] = useState(false);

  const [audio] = useState(() => {
    const randomAudio = getRandomNumber(1, 3);

    return new Audio(`sounds/fight-sound-${randomAudio}.mp3`);
  });

  const startFight = () => {
    audio.play();
    audio.loop = true;
    setFightStarted(true);
  };

  useEffect(() => {
    if (phase === 5) {
      openDialog();
    }
  }, [phase]);

  useEffect(() => {
    if (fightStarted && !adventureIsOver) {
      const timer = setTimeout(() => {
        if (fightHistory.length === 0) {
          const randomAttack = getRandomNumber(
            boss.MIN_ATTACK,
            boss.MAX_ATTACK
          );

          increaseLife(-randomAttack);

          setFightHistory((prev) => [
            ...prev,
            {
              isBoss: true,
              characterName: boss.NAME,
              damageToLife: randomAttack,
            },
          ]);
        } else {
          const lastAttackWasBoss =
            fightHistory[fightHistory.length - 1].isBoss;

          if (!lastAttackWasBoss) {
            const randomAttack = getRandomNumber(
              boss.MIN_ATTACK,
              boss.MAX_ATTACK
            );

            increaseLife(-randomAttack);

            setFightHistory((prev) => [
              ...prev,
              {
                isBoss: true,
                characterName: boss.NAME,
                damageToLife: randomAttack,
              },
            ]);
          } else {
            const randomAttack = getRandomNumber(
              Math.max(attackPoints - 5, 1),
              attackPoints
            );

            const newBoosLife = Math.max(boss.LIFE_POINTS - randomAttack, 0);

            setBoss((prev) => ({
              ...prev,
              LIFE_POINTS: Math.max(prev.LIFE_POINTS - randomAttack, 0),
            }));

            setFightHistory((prev) => [
              ...prev,
              {
                isBoss: false,
                characterName: boss.NAME,
                damageToLife: randomAttack,
              },
            ]);

            if (newBoosLife <= 0) {
              endAdventure();
            }
          }
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [fightStarted, fightHistory]);

  useEffect(() => {
    if (adventureIsOver) {
      audio.pause();
    }
  }, [adventureIsOver]);

  if (adventureIsOver) {
    return <FightResult />;
  }

  return (
    <ModalContainer
      isOpen={isOpenDialog}
      onClose={() => null}
      title="BOOS FIGHT"
    >
      <Text>Boos Fight</Text>
      <Flex alignItems="center" gap={3}>
        <Box w="45%">
          <Flex gap={2} alignItems="center" mb={2}>
            <Icon as={AiFillHeart} boxSize={5} color="green.400" />
            <Text fontSize={16}>{life} / 100</Text>
          </Flex>
          <Progress value={life} colorScheme="green" borderRadius="md" h={5} />

          <Image
            src="assets/cheems-base.png"
            alt="Character render"
            objectFit="cover"
          />
        </Box>
        <Text fontSize={30} w="10%">
          vs
        </Text>
        <Box w="45%">
          <Flex gap={2} alignItems="center" mb={2}>
            <Icon as={AiFillHeart} boxSize={5} color="red" />
            <Text fontSize={16}>{boss.LIFE_POINTS} / 100</Text>
          </Flex>

          <Progress
            value={boss.LIFE_POINTS}
            colorScheme="red"
            borderRadius="md"
            h={5}
          />
          <Image
            src="assets/dark-cheems.png"
            alt="Character render"
            objectFit="cover"
          />
        </Box>
      </Flex>

      <Box maxHeight="300px" py={5} overflowY="auto">
        {fightHistory.map((el, index) => (
          <Alert
            key={index.toString()}
            status={el.isBoss ? "error" : "success"}
            variant="left-accent"
          >
            <AlertIcon />
            {el.characterName} ataca: hizo{" "}
            <Text fontWeight="bold" mx={2}>
              {el.damageToLife}
            </Text>{" "}
            de daño
          </Alert>
        ))}
      </Box>

      <Button
        disabled={fightStarted}
        onClick={startFight}
        width="full"
        colorScheme="red"
      >
        {fightStarted ? "Peleamdo..." : "Empezar pelea"}
      </Button>
    </ModalContainer>
  );
};
