export interface IIsString {
  (data: any): boolean;
}
export const isString: IIsString = (data) => {
  return typeof data === "string";
};
