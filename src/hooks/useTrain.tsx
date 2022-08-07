import { useState } from "react";
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

  const [isTraining, setIsTraining] = useState(false);
  const [trainIsEnded, setTrainIsEnded] = useState(false);

  const trainAttack = () => {
    const attackToGain = getRandomNumber(
      trainParams.MIN_WIN_ATTACK_PONTS,
      trainParams.MAX_WIN_ATTACK_POINTS
    );

    const lifeToLoose = getRandomNumber(
      trainParams.MIN_LIFE_LOST_FOR_WIN_ATTACK,
      trainParams.MAX_LIFE_LOST_FOR_WIN_ATTACK
    );

    setIsTraining(true);

    setTimeout(() => {
      increaseAttackPoints(attackToGain);
      increaseLife(-lifeToLoose);
      increasePhase();
      setIsTraining(false);
      setTrainIsEnded(true);

      setTimeout(() => {
        setTrainIsEnded(false);
      }, 500);
    }, 5000);
  };

  const trainDefense = () => {
    const defenseToGain = getRandomNumber(
      trainParams.MIN_WIN_DEFENSE_PONTS,
      trainParams.MAX_WIN_DEFENSE_POINTS
    );

    const lifeToLoose = getRandomNumber(
      trainParams.MIN_LIFE_LOST_FOR_WIN_DEFENSE,
      trainParams.MAX_LIFE_LOST_FOR_WIN_DEFENSE
    );

    setIsTraining(true);

    setTimeout(() => {
      increaseDefensePoints(defenseToGain);
      increaseLife(-lifeToLoose);
      increasePhase();
      setIsTraining(false);
      setTrainIsEnded(true);

      setTimeout(() => {
        setTrainIsEnded(false);
      }, 500);
    }, 5000);
  };

  return {
    isTraining,
    trainIsEnded,
    trainAttack,
    trainDefense,
  };
};
