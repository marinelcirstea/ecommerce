export interface IMinmax {
  (str: string, min: number, max: number): boolean;
}
export const minmax: IMinmax = (str, min, max) => {
  if (!str) return false;
  if (typeof str !== "string" || typeof min !== "number" || typeof max !== "number") {
    throw new Error(
      `Expected (string, number, number) received (${typeof str}, ${typeof min}, ${typeof max})`
    );
  }
  if (!(min <= max)) {
    throw new Error(`Expected min <= max ; Received min = ${min} & max = ${max}`);
  }

  return str.length >= min && str.length <= max;
};
