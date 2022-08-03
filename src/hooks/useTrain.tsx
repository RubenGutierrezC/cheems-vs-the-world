import { trainParams } from "../constants/trainParams";
import { getRandomNumber } from "../utils";
import { useCharacterState } from "../store";

export const useTrain = () => {
  const {
    increaseAttackPoints,
    increaseDefensePoints,
    increaseLife,
    increasePhase,
  } = useCharacterState((state) => state);

  const trainAttack = () => {
    const attackToGain = getRandomNumber(
      trainParams.MIN_WIN_ATTACK_PONTS,
      trainParams.MAX_WIN_ATTACK_POINTS
    );

    const lifeToLoose = getRandomNumber(
      trainParams.MIN_LIFE_LOST_FOR_WIN_ATTACK,
      trainParams.MAX_LIFE_LOST_FOR_WIN_ATTACK
    );

    increaseAttackPoints(attackToGain);
    increaseLife(-lifeToLoose);
    increasePhase();
  };

  return {
    trainAttack,
  };
};
