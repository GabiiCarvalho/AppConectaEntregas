import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import {
  LoginScreen,
  HomeScreen,
  OrderScreen,
  TrackingScreen,
  RiderScreen,
  DeliveryDetailsScreen,
  EarningsScreen,
  RatingScreen,
  LoyaltyProgramScreen
} from './screens';
import { NotificationBell } from './components';

const Stack = createStackNavigator();

const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" />
  </View>
);

const MainNavigator = () => {
  const { user, userType, loading } = useAuth();
  const { colors, isDark } = useTheme();

  const navigationTheme = {
    ...DefaultTheme,
    dark: isDark,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.notification,
    },
    // Adicionando fonts para compatibilidade com o tema
    fonts: DefaultTheme.fonts
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator initialRouteName="Login">
        {!user ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : userType === 'customer' ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: 'Entregas Express',
                headerRight: () => <NotificationBell />,
                headerRightContainerStyle: { paddingRight: 15 }
              }}
            />
            <Stack.Screen
              name="Order"
              component={OrderScreen}
              options={{ title: 'Nova Entrega' }}
            />
            <Stack.Screen
              name="Tracking"
              component={TrackingScreen}
              options={({ route }) => ({
                title: `Rastreamento #${route.params?.deliveryId || ''}`
              })}
            />
            <Stack.Screen
              name="Rating"
              component={RatingScreen}
              options={{ title: 'Avaliar Entrega' }}
            />
            <Stack.Screen
              name="LoyaltyProgram"
              component={LoyaltyProgramScreen}
              options={{ title: 'Programa de Fidelidade' }}
            />
          </>
        ) : userType === 'rider' ? (
          <>
            <Stack.Screen
              name="Rider"
              component={RiderScreen}
              options={{ 
                title: 'Entregas Disponíveis',
                headerRightContainerStyle: { paddingRight: 15 }
              }}
            />
            <Stack.Screen
              name="DeliveryDetails"
              component={DeliveryDetailsScreen}
              options={{ title: 'Detalhes da Entrega' }}
            />
            <Stack.Screen
              name="Earnings"
              component={EarningsScreen}
              options={{ title: 'Meus Ganhos' }}
            />
          </>
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}