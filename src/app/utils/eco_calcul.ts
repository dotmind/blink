export const getTotal = (obj: Record<string, number>): number => {
  const values: number[] = Object.values(obj);
  return values.reduce((acc: number, val: number) => acc + val, 0);
};
