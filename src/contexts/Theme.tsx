import { createContext, useEffect, useState } from "react";

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

const THEME_STORAGE_KEY = "theme-storage-key";

const ThemeProvider = (props: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(lightTheme);
  const swapTheme = () => {
    const newTheme = theme.name === "light" ? darkTheme : lightTheme;
    setTheme(newTheme);
    if (typeof window !== undefined)
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newTheme));
  };

  useEffect(() => {
    const savedThemeString = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedThemeString) setTheme(JSON.parse(savedThemeString));
    else localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, swapTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
