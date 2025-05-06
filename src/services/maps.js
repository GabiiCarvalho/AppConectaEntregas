import { API_KEY } from '@env';
import { Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => resolve(position.coords),
      error => reject(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
};

export const getDirections = async (origin, destination) => {
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${API_KEY}&mode=driving`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.routes[0]?.overview_polyline?.points || null;
  } catch (error) {
    console.error('Error getting directions:', error);
    return null;
  }
};

export const openNavigationApp = (location) => {
  const { latitude, longitude } = location;
  const scheme = Platform.select({
    ios: 'maps://0,0?q=',
    android: 'geo:0,0?q=',
  });
  const url = Platform.select({
    ios: `${scheme}${latitude},${longitude}`,
    android: `${scheme}${latitude},${longitude}?z=16`,
  });

  Linking.openURL(url);
};