export default function obj(someObject: { [key: string]: any }) {
  if (typeof someObject !== "object" || Array.isArray(someObject)) {
    throw new Error(`function obj(): expected object, but received ${typeof someObject}`);
  }

  function exclude(arr: string[]) {
    if (!Array.isArray(arr)) {
      throw new Error(`function obj(object).exclude() expected array, but received ${typeof arr}`);
    }

    arr.forEach((key) => delete someObject[key]);

    return someObject;
  }

  function pick(arr: string[]) {
    if (!Array.isArray(arr)) {
      throw new Error(`function obj(object).pick() expected array, but received ${typeof arr}`);
    }

    Object.keys(someObject).forEach((key) => !arr.includes(key) && delete someObject[key]);

    return someObject;
  }
  return {
    exclude,
    pick,
  };
}
