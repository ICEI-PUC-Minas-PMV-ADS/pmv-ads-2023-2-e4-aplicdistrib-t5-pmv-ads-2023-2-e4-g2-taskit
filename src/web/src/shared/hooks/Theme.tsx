import { useContext, createContext, useState } from "react";
import { defaultTheme, darkTheme } from '@/shared/configs/theme';
import { ThemeProvider as StyledThemeProvider } from "styled-components";

export const ThemeContext = createContext({ theme: 'light', setTheme: (theme: 'light' | 'dark') => { } });

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used in ThemeProvider");
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <StyledThemeProvider theme={theme === 'light' ? defaultTheme : darkTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

