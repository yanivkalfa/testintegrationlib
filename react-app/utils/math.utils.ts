export const getRandomIDNumber = (): string => {
  const length = Math.floor(Math.random() * 3) + 9;
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
};
