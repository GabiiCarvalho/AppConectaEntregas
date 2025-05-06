import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from './ThemeContext';

export const ThemeButton = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <TouchableOpacity onPress={toggleTheme}>
      <Icon 
        name={isDark ? 'wb-sunny' : 'brightness-3'} 
        size={24} 
        color={isDark ? '#FFBB33' : '#333'} 
      />
    </TouchableOpacity>
  );
};