import { generateCyrillic } from "../../utils/language";

const en = {
  title: "3Nity",
  home: "Home",
  about: "About",
  services: "Services",
  previousWork: "Previous work",
  contactUs: "Contact us",
  freeCall: "Schedule Free Call",
};

const lat = {
  title: "3Nity",
  home: "Početna strana",
  about: "O nama",
  services: "Usluge",
  previousWork: "Naši projekti",
  contactUs: "Kontaktirajte nas",
  freeCall: "Zakažite Besplatan Poziv",
};

const cir = generateCyrillic(lat);

const language = {
  en: en,
  lat: lat,
  cir: cir,
};

export default language;
