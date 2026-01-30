import type { NameValueInterface } from "../interfaces/name-value.interface";

export const useEnum = (baseEnum: any) => {
  const buildArray = () => {
    return Object.keys(baseEnum)
      .filter((t) => isNaN(+t))
      .map((t) => ({
        name: t.split("_").join(" "),
        value: baseEnum[t],
      }));
  };

  const array: Array<NameValueInterface<number>> = buildArray();

  const getArray = () => {
    return array;
  };

  const getInstance = (id: number) => {
    return array.find((i) => i.value === id);
  };

  return {
    getArray,
    getInstance,
  };
};
