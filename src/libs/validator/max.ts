export interface IMax {
  (str: string, max: number): boolean;
}
export const max: IMax = (str, max) => {
  if (!str) return false;
  if (typeof str !== "string" || typeof max !== "number") {
    throw new Error(`Expected (string, number) received (${typeof str}, ${typeof max})`);
  }
  return str.length <= max;
};
