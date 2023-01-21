import { createContext, useState } from "react";

type Theme = {
  name: string;
  background: string;
  button: string;
  card: string;
};

type ThemeContextValue = {
  theme: Theme;
  swapTheme: () => void;
};

type ThemeProviderProps = {
  children?: React.ReactNode;
};

export const lightTheme = {
  name: "light",
  background: "background-light",
  button: "button-light",
  card: "card-light",
};

export const darkTheme = {
  name: "dark",
  background: "background-dark",
  button: "button-dark",
  card: "card-dark",
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const ThemeProvider = (props: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(lightTheme);
  const swapTheme = () => {
    theme.name === "light" ? setTheme(darkTheme) : setTheme(lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, swapTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
