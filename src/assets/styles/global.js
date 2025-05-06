import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#FF9900',
  secondary: '#232F3E',
  success: '#32CD32',
  warning: '#FFA500',
  danger: '#FF0000',
  light: '#F5F5F5',
  dark: '#333',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark,
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  errorText: {
    color: colors.danger,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center',
  },
});