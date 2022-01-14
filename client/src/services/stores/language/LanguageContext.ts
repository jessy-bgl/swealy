import React, { Context, createContext } from "react";

enum Languages {
  FR = "fr",
  EN = "en",
}

interface ILanguageContext {
  language: Languages;
  setLanguage: React.Dispatch<Languages>;
}

const LanguageContext: Context<ILanguageContext> = createContext(
  {} as ILanguageContext
);

export type { ILanguageContext };
export { LanguageContext, Languages };
