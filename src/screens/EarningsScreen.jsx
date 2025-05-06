import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Chart, Line, Area, XAxis, YAxis } from 'react-native-responsive-linechart';

const EarningsScreen = () => {
  const [earnings, setEarnings] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  useEffect(() => {
    // Simulação: buscar dados de ganhos
    const fetchEarnings = async () => {
      // Dados mockados - na prática viria da API
      const mockData = {
        week: [
          { day: 'Seg', value: 85 },
          { day: 'Ter', value: 120 },
          { day: 'Qua', value: 95 },
          { day: 'Qui', value: 150 },
          { day: 'Sex', value: 210 },
          { day: 'Sáb', value: 180 },
          { day: 'Dom', value: 140 },
        ],
        month: [
          { week: 'Sem 1', value: 520 },
          { week: 'Sem 2', value: 680 },
          { week: 'Sem 3', value: 710 },
          { week: 'Sem 4', value: 650 },
        ],
      };
      
      setEarnings(mockData[selectedPeriod]);
    };

    fetchEarnings();
  }, [selectedPeriod]);

  const calculateTotal = () => {
    return earnings.reduce((sum, item) => sum + item.value, 0);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Ganhos</Text>
        <Text style={styles.headerAmount}>R$ {calculateTotal().toFixed(2)}</Text>
        <Text style={styles.headerPeriod}>
          {selectedPeriod === 'week' ? 'Esta semana' : 'Este mês'}
        </Text>
      </View>

      <View style={styles.chartContainer}>
        <Chart
          style={{ height: 200 }}
          data={earnings.map((item, index) => ({ x: index, y: item.value }))}
          padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
          xDomain={{ min: 0, max: earnings.length - 1 }}
          yDomain={{ min: 0, max: Math.max(...earnings.map(e => e.value)) + 50 }}
        >
          <YAxis
            tickCount={6}
            theme={{ labels: { formatter: (v) => v.toFixed(0) } }}
          />
          <XAxis
            tickCount={earnings.length}
            theme={{
              labels: { 
                formatter: (v) => earnings[v]?.day || earnings[v]?.week || '' 
              }
            }}
          />
          <Area
            theme={{
              gradient: {
                from: { color: '#FF9900', opacity: 0.4 },
                to: { color: '#FF9900', opacity: 0.1 },
              },
            }}
          />
          <Line
            theme={{
              stroke: { color: '#FF9900', width: 2 },
              scatter: { default: { width: 4, height: 4, rx: 2 } },
            }}
          />
        </Chart>
      </View>

      <View style={styles.periodSelector}>
        <Text
          style={[
            styles.periodOption,
            selectedPeriod === 'week' && styles.periodOptionActive,
          ]}
          onPress={() => setSelectedPeriod('week')}
        >
          Semanal
        </Text>
        <Text
          style={[
            styles.periodOption,
            selectedPeriod === 'month' && styles.periodOptionActive,
          ]}
          onPress={() => setSelectedPeriod('month')}
        >
          Mensal
        </Text>
      </View>

      <View style={styles.deliveriesList}>
        <Text style={styles.listTitle}>Entregas realizadas</Text>
        {earnings.map((item, index) => (
          <View key={index} style={styles.deliveryItem}>
            <Text style={styles.deliveryDay}>
              {item.day || item.week}
            </Text>
            <Text style={styles.deliveryAmount}>
              R$ {item.value.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#FF9900',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  headerAmount: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  headerPeriod: {
    fontSize: 16,
    color: 'white',
  },
  chartContainer: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  periodOption: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 15,
    backgroundColor: '#eee',
    color: '#555',
  },
  periodOptionActive: {
    backgroundColor: '#FF9900',
    color: 'white',
  },
  deliveriesList: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  deliveryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  deliveryDay: {
    fontSize: 16,
  },
  deliveryAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EarningsScreen;