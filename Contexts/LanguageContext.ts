import React from "react";

interface LanguageContextProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = React.createContext<LanguageContextProps>({
  language: "en",
  setLanguage: () => {},
});

export default LanguageContext;