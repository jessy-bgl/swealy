import { useEffect, useReducer } from "react";
import { LanguageContext } from "./LanguageContext";
import { LanguageReducer, initializer } from "./LanguageReducer";

function useProvideLanguage() {
  const [language, setLanguage] = useReducer(
    LanguageReducer,
    undefined,
    initializer
  );

  useEffect(() => {
    localStorage.setItem("language", JSON.stringify(language));
  }, [language]);

  return { language: language, setLanguage: setLanguage };
}

function LanguageProvider({ children }) {
  const languageValue = useProvideLanguage();

  return (
    <LanguageContext.Provider value={languageValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export { LanguageProvider };
