export const trainParams = {
  // TRAIN ATTACK VALUES
  MAX_WIN_ATTACK_POINTS: 5,
  MIN_WIN_ATTACK_PONTS: 1,
  MAX_LIFE_LOST_FOR_WIN_ATTACK: 10,
  MIN_LIFE_LOST_FOR_WIN_ATTACK: 5,

  // TRAIN DEFENSE VALUES
  MAX_WIN_DEFENSE_POINTS: 5,
  MIN_WIN_DEFENSE_PONTS: 1,
  MAX_LIFE_LOST_FOR_WIN_DEFENSE: 7,
  MIN_LIFE_LOST_FOR_WIN_DEFENSE: 2,
};

export const restParams = {
  // REST
  MAX_LIFE_TO_GAIN_RESTING: 20,
  MIN_LIFE_TO_GAIN_RESTING: 10,
};

export const exploreParams = {
  1: "NOTHING",
  2: "GAIN ATTACK",
  3: "GAIN DEFENSE",
  4: "GAIN ATTACK AND DEFENSE",
  5: "LOST ATTACK",
  6: "LOST DEFENSE",
  7: "LOST ATTACK AND DEFENSE",
  8: "LOST LIFE",
  9: "GAIN COINS",
};

export const coinsParams = {
  MAX_COINS_TO_WIN_FOR_EXPLORE: 100,
  MIN_COINS_TO_WIN_FOR_EXPLORE: 50,
  MAX_COINT_TO_WIN_FOR_DEFEAT_BOSS: 1000,
  MIN_COINT_TO_WIN_FOR_DEFEAT_BOSS: 1000,
};