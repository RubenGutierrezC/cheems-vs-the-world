import { useState } from "react";
import { coinsParams, restParams, trainParams } from "../constants/trainParams";
import { getRandomNumber } from "../utils";
import { useCharacterState } from "../store";

export const useExplore = () => {
  const {
    increaseCoins,
    increasePhase,
    increaseAttackPoints,
    increaseDefensePoints,
    increaseLife,
  } = useCharacterState((state) => state);

  const [isExploring, setIsExploring] = useState(false);
  const [exploreIsEnded, setExploreIsEnded] = useState(false);
  const [showText, setShowText] = useState("");

  const explore = () => {
    // init
    let showText = "";
    let pointsToIncrease = 0;
    let increaseFunction: any;

    const exploreResult = getRandomNumber(1, 10);

    if ([2, 3, 4, 5, 6, 7].includes(exploreResult)) {
      const attackToGain = getRandomNumber(
        trainParams.MIN_WIN_ATTACK_PONTS,
        trainParams.MAX_WIN_ATTACK_POINTS
      );

      const defenseToGain = getRandomNumber(
        trainParams.MIN_WIN_DEFENSE_PONTS,
        trainParams.MAX_WIN_DEFENSE_POINTS
      );

      switch (exploreResult) {
        case 2:
          showText = "Haz ganado puntos de ataque";
          pointsToIncrease = attackToGain;
          increaseFunction = increaseAttackPoints;
          break;
        case 3:
          showText = "Haz ganado puntos de defensa";
          pointsToIncrease = defenseToGain;
          increaseFunction = increaseDefensePoints;
        case 4:
          showText = "Haz ganado puntos de ataque y defensa";
          increaseFunction = () => {
            increaseAttackPoints(attackToGain);
            increaseDefensePoints(defenseToGain);
          };
        case 5:
          showText = "Haz perdido puntos de ataque";
          pointsToIncrease = -attackToGain;
          increaseFunction = increaseAttackPoints;
        case 6:
          showText = "Haz perdido puntos de defensa";
          pointsToIncrease = -defenseToGain;
          increaseFunction = increaseDefensePoints;
        case 7:
          showText = "Haz perdido puntos de ataque y defensa";
          increaseFunction = () => {
            increaseAttackPoints(-attackToGain);
            increaseDefensePoints(-defenseToGain);
          };
        default:
          break;
      }
    }

    if (exploreResult === 8) {
      const lifeToLoose = getRandomNumber(
        restParams.MIN_LIFE_TO_GAIN_RESTING,
        restParams.MAX_LIFE_TO_GAIN_RESTING
      );

      showText =
        "Cheems se ha metido por un barrio peligroso y ha perdido algo de vida";
      pointsToIncrease = -lifeToLoose;
      increaseFunction = increaseLife;
    }

    if ([9, 10].includes(exploreResult)) {
      const coinsToGain = getRandomNumber(
        coinsParams.MIN_COINS_TO_WIN_FOR_EXPLORE,
        coinsParams.MAX_COINS_TO_WIN_FOR_EXPLORE
      );

      showText =
        exploreResult === 9
          ? "Cheems se ha encontrado algunas monedas"
          : "Cheems se ha metido por un barrio peligroso y ha perdido algunas monedas";
      pointsToIncrease = exploreResult === 9 ? coinsToGain : -coinsToGain;
      increaseFunction = increaseCoins;
    }

    setIsExploring(true);

    setTimeout(() => {
      setShowText(showText);
      increaseFunction(pointsToIncrease);
      increasePhase();
      setIsExploring(false);
      setExploreIsEnded(true);
    }, 5000);
  };

  const resetExplore = () => {
    setExploreIsEnded(false);
  };

  return {
    isExploring,
    exploreIsEnded,
    explore,
    showText,
    resetExplore,
  };
};
