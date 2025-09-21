export const calculateAmount = (amounts: string) => {
  const amountsArray = amounts
    .split(/[\n,]+/)
    .map((amount) => amount.trim())
    .filter((amount) => amount !== "")
    .map((amount) => Number(amount));
  return amountsArray.reduce((total, amount) => total + amount, 0);
};
