'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  attribute?: string;
  disableTransitionOnChange?: boolean;
};

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  enableSystem = true,
  attribute = 'data-theme',
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme attribute
    root.removeAttribute(attribute);

    // Handle system theme preference
    const systemTheme = enableSystem && window.matchMedia('(prefers-color-scheme: dark)')?.matches 
      ? 'dark' 
      : 'light';
    
    // Set the actual theme based on preference
    const activeTheme = theme === 'system' ? systemTheme : theme;
    
    // Disable transitions to avoid flashing
    if (disableTransitionOnChange) {
      document.documentElement.classList.add('disable-transitions');
    }
    
    // Set the theme attribute
    root.setAttribute(attribute, activeTheme);
    
    // Re-enable transitions after a short delay
    if (disableTransitionOnChange) {
      window.setTimeout(() => {
        document.documentElement.classList.remove('disable-transitions');
      }, 0);
    }
  }, [theme, enableSystem, attribute, disableTransitionOnChange]);

  // Listen for system theme changes
  useEffect(() => {
    if (!enableSystem) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Update theme when system preference changes
    const onSystemThemeChange = () => {
      if (theme === 'system') {
        document.documentElement.setAttribute(
          attribute,
          mediaQuery.matches ? 'dark' : 'light'
        );
      }
    };

    mediaQuery.addEventListener('change', onSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', onSystemThemeChange);
  }, [theme, attribute, enableSystem]);

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 