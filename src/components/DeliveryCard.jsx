import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DeliveryCard = ({ delivery }) => {
  const getStatusColor = () => {
    switch(delivery.status) {
      case 'preparando': return '#FFA500';
      case 'em rota': return '#1E90FF';
      case 'entregue': return '#32CD32';
      default: return '#A9A9A9';
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.store}>{delivery.store}</Text>
      <Text style={styles.address}>{delivery.address}</Text>
      <View style={styles.statusContainer}>
        <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
        <Text style={styles.status}>{delivery.status.toUpperCase()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  store: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    color: '#666',
    marginVertical: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  status: {
    fontSize: 14,
    color: '#555',
  },
});