import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DeliveryCard from '../components/DeliveryCard';

const HomeScreen = ({ navigation }) => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de dados
    const mockData = [
      { id: 1, store: 'Mercado Central', status: 'preparando', address: 'Rua A, 123' },
      { id: 2, store: 'Farmácia Saúde', status: 'em rota', address: 'Av. B, 456' },
    ];
    setDeliveries(mockData);
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Minhas Entregas</Text>
      
      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        <FlatList
          data={deliveries}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => navigation.navigate('Tracking', { deliveryId: item.id })}
            >
              <DeliveryCard delivery={item} />
            </TouchableOpacity>
          )}
        />
      )}
      
      <TouchableOpacity
        style={styles.newOrderButton}
        onPress={() => navigation.navigate('Order')}
      >
        <Text style={styles.buttonText}>Nova Entrega</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  newOrderButton: {
    backgroundColor: '#FF9900',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;