import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from './ThemeContext';

export const MyComponent = () => {
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <Text style={{ color: colors.text }}>Conteúdo</Text>
      <TouchableOpacity onPress={toggleTheme}>
        <Text style={{ color: colors.primary }}>
          Alternar para {isDark ? 'Light' : 'Dark'} Mode
        </Text>
      </TouchableOpacity>
    </View>
  );
};