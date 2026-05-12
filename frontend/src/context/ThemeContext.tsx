import { createContext, useContext, useState, type ReactNode } from "react";
import { darkTheme, lightTheme, type AppTheme } from "../styles/theme";

interface ThemeContextType {
  theme: AppTheme;
  isDark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: darkTheme,
  isDark: true,
  toggle: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(true);
  const toggle = () => setIsDark((prev) => !prev);
  return (
    <ThemeContext.Provider
      value={{ theme: isDark ? darkTheme : lightTheme, isDark, toggle }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
