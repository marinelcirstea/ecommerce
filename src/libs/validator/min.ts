export interface IMin {
  (str: string, min: number): boolean;
}
export const min: IMin = (str, min) => {
  if (!str) return false;
  if (typeof str !== "string" || typeof min !== "number") {
    throw new Error(`Expected (string, number) received (${typeof str}, ${typeof min})`);
  }
  return str.length >= min;
};
