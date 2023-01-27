import { latinToCyrilic } from "serbian-script-converter";

interface Prevodi {
  [key: string]: string | Prevodi;
}

export const getLanguage = (prevodi: any, kljuc: string) => {
  const prevod = prevodi[kljuc];
  return prevod;
};

export const generateCyrillic = (prevod: any) => {
  const returnObject: Prevodi = {};
  for (const key in prevod) {
    if (prevod.hasOwnProperty(key)) {
      const element = prevod[key];
      if (typeof element === "string") {
        returnObject[key] = latinToCyrilic(element);
      } else {
        returnObject[key] = generateCyrillic(element);
      }
    }
  }
  return returnObject;
};
