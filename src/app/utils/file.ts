export function displayFileWeight(weightInKb: number) {
  if (weightInKb > 1000) {
    return `${weightInKb}MB`;
  }

  return `${weightInKb}KB`;
}
