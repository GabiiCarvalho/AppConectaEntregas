import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

// Cores para os temas
const lightColors = {
  primary: '#FF9900',
  background: '#FFFFFF',
  card: '#FFFFFF',
  text: '#333333',
  border: '#E0E0E0',
  notification: '#FF9900',
  subtitle: '#666666',
};

const darkColors = {
  primary: '#FFBB33',
  background: '#121212',
  card: '#1E1E1E',
  text: '#FFFFFF',
  border: '#333333',
  notification: '#FFBB33',
  subtitle: '#AAAAAA',
};

// Criar o contexto
export const ThemeContext = createContext();

// Provedor do tema
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(Appearance.getColorScheme() === 'dark');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDark(colorScheme === 'dark');
    });
    return () => subscription.remove();
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = {
    isDark,
    toggleTheme,
    colors: isDark ? darkColors : lightColors,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado
export const useTheme = () => React.useContext(ThemeContext);