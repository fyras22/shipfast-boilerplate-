'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// Simple theme context
type Theme = 'light' | 'dark' | 'system';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ThemeProvider component
function ThemeProvider({
  children,
  defaultTheme = 'system',
  attribute = 'data-theme',
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  attribute?: string;
}) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Handle system theme preference
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')?.matches 
      ? 'dark' 
      : 'light';
    
    // Set the actual theme based on preference
    const activeTheme = theme === 'system' ? systemTheme : theme;
    
    // Set the theme attribute
    root.setAttribute(attribute, activeTheme);
  }, [theme, attribute]);

  // Listen for system theme changes
  useEffect(() => {
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
  }, [theme, attribute]);

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

// Simple auth context - doesn't actually do anything in development
const AuthContext = createContext<{ user: any | null }>({ user: null });

// Main providers wrapper
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={{ user: null }}>
      <ThemeProvider attribute="data-theme" defaultTheme="system">
        {children}
      </ThemeProvider>
    </AuthContext.Provider>
  );
} 