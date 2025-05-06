import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RiderScreen from '../screens/RiderScreen';
import DeliveryDetailsScreen from '../screens/DeliveryDetailsScreen';
import EarningsScreen from '../screens/EarningsScreen';

const Stack = createStackNavigator();

const RiderNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="RiderHome" 
        component={RiderScreen} 
        options={{ headerShown: false }}
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
    </Stack.Navigator>
  );
};

export default RiderNavigation;