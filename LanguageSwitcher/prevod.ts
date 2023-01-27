import { generateCyrillic } from "../../utils/language";

const en = {
  en: "English",
  lat: "Latin",
  cir: "Cyrillic",
  changeLang: "Change language",
};

const lat = {
  en: "Engleski",
  lat: "Latinica",
  cir: "Ćirilica",
  changeLang: "Promeni jezik",
};

const cir = generateCyrillic(lat);

const language = {
  en: en,
  lat: lat,
  cir: cir,
};

export default language;
