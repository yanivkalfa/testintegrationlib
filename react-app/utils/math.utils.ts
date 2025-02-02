export const getRandomIDNumber = () :string => {
  const length = Math.floor(Math.random() * 7) + 9;
  return (Math.floor(Math.random() * (10 ** length - 10 ** (length - 1))) + 10 ** (length - 1)).toString();
}