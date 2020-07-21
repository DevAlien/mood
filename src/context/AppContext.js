import { createContext } from "react";
const AppContext = createContext();
const { Provider: AppProvider } = AppContext;

export { AppContext, AppProvider };
