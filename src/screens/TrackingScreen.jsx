import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import PropTypes from 'prop-types';

TrackingScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      deliveryId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default TrackingScreen = ({ route }) => {
  const { deliveryId } = route.params;
  const [delivery, setDelivery] = useState(null);
  const [riderLocation, setRiderLocation] = useState({
    latitude: -23.5505,
    longitude: -46.6333,
  });
  const INITIAL_REGION = {
    latitude: -26.9975,
  longitude: -48.6325,
  latitudeDelta: 0.015,
  longitudeDelta: 0.008
  };

  useEffect(() => {
    // Simulação: buscar dados da entrega
    const fetchDelivery = async () => {
      // Aqui você faria uma chamada API para buscar os dados reais
      const mockDelivery = {
        id: deliveryId,
        store: 'Mercado Central',
        storeLocation: { latitude: -23.5605, longitude: -46.6433 },
        destination: 'Rua A, 123',
        status: 'em rota',
        rider: 'João Motoboy',
      };
      setDelivery(mockDelivery);
    };

    fetchDelivery();

    // Simulação: atualização em tempo real da posição do motoboy
    const interval = setInterval(() => {
      setRiderLocation(prev => ({
        latitude: prev.latitude + 0.0005,
        longitude: prev.longitude + 0.0005,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [deliveryId]);

  if (!delivery) return <View style={styles.container}><Text>Carregando...</Text></View>;

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Entrega #{delivery.id}</Text>
        <Text>Loja: {delivery.store}</Text>
        <Text>Motoboy: {delivery.rider}</Text>
        <Text>Status: {delivery.status}</Text>
        <Text>Destino: {delivery.destination}</Text>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: riderLocation.latitude,
          longitude: riderLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={delivery.storeLocation}
          title="Loja"
          pinColor="blue"
        />
        <Marker
          coordinate={riderLocation}
          title="Motoboy"
          pinColor="red"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  map: {
    flex: 1,
  },
});

