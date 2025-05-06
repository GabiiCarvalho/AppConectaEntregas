import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default DeliveryDetailsScreen = ({ route }) => {
  const { delivery } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações da Entrega</Text>
        
        <View style={styles.detailRow}>
          <Icon name="assignment" size={24} color="#FF9900" />
          <View style={styles.detailText}>
            <Text style={styles.detailLabel}>Número do Pedido</Text>
            <Text style={styles.detailValue}>#{delivery.id}</Text>
          </View>
        </View>
        
        <View style={styles.detailRow}>
          <Icon name="store" size={24} color="#FF9900" />
          <View style={styles.detailText}>
            <Text style={styles.detailLabel}>Loja</Text>
            <Text style={styles.detailValue}>{delivery.store}</Text>
          </View>
        </View>
        
        <View style={styles.detailRow}>
          <Icon name="location-on" size={24} color="#FF9900" />
          <View style={styles.detailText}>
            <Text style={styles.detailLabel}>Endereço de Entrega</Text>
            <Text style={styles.detailValue}>{delivery.destination}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Itens do Pedido</Text>
        {delivery.items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQty}>Qtd: {item.quantity}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pagamento</Text>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Valor da Entrega:</Text>
          <Text style={styles.paymentValue}>R$ {delivery.payment.toFixed(2)}</Text>
        </View>
        {delivery.tip > 0 && (
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Gorjeta:</Text>
            <Text style={styles.paymentValue}>+ R$ {delivery.tip.toFixed(2)}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailText: {
    marginLeft: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemName: {
    fontSize: 16,
  },
  itemQty: {
    fontSize: 16,
    color: '#666',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  paymentLabel: {
    fontSize: 16,
  },
  paymentValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

