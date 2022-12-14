import create from "zustand";
import { generateNewAmount } from "../utils/index";

interface CharacterState {
  life: number;
  coins: number;
  stage: number;
  phase: number;
  attackPoints: number;
  defensePoints: number;
  adventureIsOver: boolean;
  increaseLife: (amount: number) => void;
  increaseCoins: (amount: number) => void;
  increaseAttackPoints: (amount: number) => void;
  increaseDefensePoints: (amount: number) => void;
  increasePhase: () => void;
  endAdventure: () => void;
}

export const useCharacterState = create<CharacterState>((set) => ({
  life: 100,
  coins: 0,
  stage: 1,
  phase: 1,
  attackPoints: 1,
  defensePoints: 1,
  adventureIsOver: false,
  increaseLife: (amount) =>
    set((state) => {
      const newLife = generateNewAmount(state.life, amount);
      return { life: newLife, adventureIsOver: newLife <= 0 };
    }),
  increaseCoins: (amount) =>
    set((state) => ({ coins: generateNewAmount(state.coins, amount) })),
  increaseAttackPoints: (amount) =>
    set((state) => ({
      attackPoints: generateNewAmount(state.attackPoints, amount),
    })),
  increaseDefensePoints: (amount) =>
    set((state) => ({
      defensePoints: generateNewAmount(state.defensePoints, amount),
    })),
  increasePhase: () => {
    set((state) => {
      const newPhase = Math.min(5, state.phase + 1);

      // if (newPhase === 5) {
      //   return {
      //     stage: Math.max(3, state.stage + 1),
      //     phase: 1,
      //   };
      // }

      return {
        phase: newPhase,
      };
    });
  },
  endAdventure: () => set((state) => ({ adventureIsOver: true })),
}));
