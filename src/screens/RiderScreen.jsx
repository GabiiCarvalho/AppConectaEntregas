import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default RiderScreen = ({ navigation }) => {
  const [activeDelivery, setActiveDelivery] = useState(null);
  const [position, setPosition] = useState({
    latitude: -23.5505,
    longitude: -46.6333,
  });
  const [isAvailable, setIsAvailable] = useState(true);

  // Simulação: buscar entregas disponíveis
  useEffect(() => {
    const fetchDeliveries = async () => {
      // Chamada API real viria aqui
      const mockDelivery = {
        id: 123,
        store: 'Mercado Central',
        storeLocation: { latitude: -23.5605, longitude: -46.6433 },
        destination: 'Rua A, 123',
        destinationLocation: { latitude: -23.5405, longitude: -46.6233 },
        payment: 15.50,
        distance: '2.5 km',
      };
      setActiveDelivery(mockDelivery);
    };

    if (!isAvailable) {
      fetchDeliveries();
    }
  }, [isAvailable]);

  const handleAcceptDelivery = () => {
    setIsAvailable(false);
    // Iniciar navegação para a loja
    navigation.navigate('RiderNavigation', { delivery: activeDelivery });
  };

  const handleCompleteDelivery = () => {
    setIsAvailable(true);
    setActiveDelivery(null);
    alert('Entrega concluída com sucesso!');
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {activeDelivery && !isAvailable && (
          <>
            <Marker coordinate={activeDelivery.storeLocation} title="Loja" pinColor="blue" />
            <Marker coordinate={activeDelivery.destinationLocation} title="Destino" />
            <Polyline
              coordinates={[activeDelivery.storeLocation, activeDelivery.destinationLocation]}
              strokeColor="#FF9900"
              strokeWidth={4}
            />
          </>
        )}
        <Marker coordinate={position} title="Você" pinColor="green" />
      </MapView>

      {isAvailable ? (
        <View style={styles.availableContainer}>
          <Text style={styles.statusText}>Você está disponível</Text>
          <Icon name="location-on" size={30} color="#4CAF50" />
          <Text style={styles.waitingText}>Aguardando novas entregas...</Text>
        </View>
      ) : (
        <View style={styles.deliveryContainer}>
          <Text style={styles.deliveryTitle}>Entrega #{activeDelivery?.id}</Text>
          
          <View style={styles.deliveryInfo}>
            <View style={styles.infoRow}>
              <Icon name="store" size={20} color="#555" />
              <Text style={styles.infoText}>{activeDelivery?.store}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Icon name="directions-bike" size={20} color="#555" />
              <Text style={styles.infoText}>{activeDelivery?.distance}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Icon name="attach-money" size={20} color="#555" />
              <Text style={styles.infoText}>R$ {activeDelivery?.payment.toFixed(2)}</Text>
            </View>
          </View>

          {!activeDelivery?.pickedUp ? (
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handleAcceptDelivery}
            >
              <Text style={styles.buttonText}>ACEITAR ENTREGA</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.completeButton} 
              onPress={handleCompleteDelivery}
            >
              <Text style={styles.buttonText}>CONCLUIR ENTREGA</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  availableContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  waitingText: {
    color: '#666',
  },
  deliveryContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  deliveryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  deliveryInfo: {
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
  },
  actionButton: {
    backgroundColor: '#FF9900',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});