import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcon';

export default StoreDashboardScreen = ({ navigation }) => {
    const [orders, setOrders] = useState([]);
    const [activeTab, setSctiveTab] = useState('peding');

    useEffect(() => {
        const fetchOrders = async () => {
            const snapshot = await FirebaseFirestoreTypes()
            .collection('orders')
            .where('storeId', '==', auth().currentUser.uid)
            .where('status', '==', activeTab)
            .orderBy('createdAt', 'desde')
            .get();

        const ordersData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setOrders(ordersData);
        };

        fetchOrders();
    }, [activeTab]);

    const renderOrderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.orderCard}
            onPress={() => navigation.navigate('OrderDetails', { orderId: item.id })}
        >
            <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Pedido #{item.id.substring(0, 8)}</Text>
                <Text style={styles.orderDate}>
                    {new Date(item.createdAt.seconds * 1000).toLocaleDateString()}
                </Text>
                </View>   
                <Text style={styles.customerName}>{item.customerName}</Text>
                <View style={styles.orderFooter}>
                    <Text style={styles.orderTotal}>R$ {item.total.toFixed(2)}</Text>
                    <Icon name="chevron-right" size={20} color="#666" />
                </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
              onPress={() => setActiveTab('pending')}
            >
              <Text style={styles.tabText}>Pendentes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'preparing' && styles.activeTab]}
              onPress={() => setActiveTab('preparing')}
            >
              <Text style={styles.tabText}>Preparando</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'ready' && styles.activeTab]}
              onPress={() => setActiveTab('ready')}
            >
              <Text style={styles.tabText}>Prontos</Text>
            </TouchableOpacity>
          </View>
    
          <FlatList
            data={orders}
            renderItem={renderOrderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
          />
    
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>15</Text>
              <Text style={styles.statLabel}>Pedidos hoje</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>R$ 342,50</Text>
              <Text style={styles.statLabel}>Faturamento</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.7</Text>
              <Text style={styles.statLabel}>Avaliação</Text>
            </View>
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
      },
      tabs: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        elevation: 2,
      },
      tab: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
      },
      activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#FF9900',
      },
      tabText: {
        color: '#333',
      },
      listContent: {
        padding: 10,
      },
      orderCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        elevation: 1,
      },
      orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
      },
      orderId: {
        fontWeight: 'bold',
      },
      orderDate: {
        color: '#666',
      },
      customerName: {
        marginBottom: 10,
      },
      orderFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      orderTotal: {
        fontWeight: 'bold',
        fontSize: 16,
      },
      statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        elevation: 3,
      },
      statItem: {
        flex: 1,
        alignItems: 'center',
      },
      statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF9900',
      },
      statLabel: {
        color: '#666',
      },
    });

    