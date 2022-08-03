export const getRandomNumber = (min: number, max: number) => {
  const number = Math.random() * (max - min) + min;
  return Math.round(number);
};

export const generateNewAmount = (oldAMount: number, amountToAdd: number) => {
  const newAmount = oldAMount + amountToAdd;

  if (newAmount > 100) return 100;

  if (newAmount < 0) return 0;

  return newAmount;
};
