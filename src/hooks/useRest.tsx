import { useState } from "react";
import { restParams } from "../constants/trainParams";
import { getRandomNumber } from "../utils";
import { useCharacterState } from "../store";

export const useRest = () => {
  const { increaseLife, increasePhase } = useCharacterState((state) => state);

  const [isResting, setIsResting] = useState(false);
  const [restIsEnded, setRestIsEnded] = useState(false);

  const rest = () => {
    const lifeToGain = getRandomNumber(
      restParams.MIN_LIFE_TO_GAIN_RESTING,
      restParams.MAX_LIFE_TO_GAIN_RESTING
    );

    setIsResting(true);

    setTimeout(() => {
      increaseLife(lifeToGain);
      increasePhase();
      setIsResting(false);
      setRestIsEnded(true);

      setTimeout(() => {
        setRestIsEnded(false);
      }, 500);
    }, 5000);
  };

  return {
    isResting,
    restIsEnded,
    rest,
  };
};
