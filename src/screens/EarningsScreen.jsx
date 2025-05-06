import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';

export default EarningsScreen = () => {
  const { colors } = useTheme();
  const [earnings, setEarnings] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  useEffect(() => {
    const mockData = {
      week: [
        { name: 'Seg', value: 85 },
        { name: 'Ter', value: 120 },
        { name: 'Qua', value: 95 },
        { name: 'Qui', value: 150 },
        { name: 'Sex', value: 210 },
        { name: 'Sáb', value: 180 },
        { name: 'Dom', value: 140 },
      ],
      month: [
        { name: 'Sem 1', value: 520 },
        { name: 'Sem 2', value: 680 },
        { name: 'Sem 3', value: 710 },
        { name: 'Sem 4', value: 650 },
      ],
    };
    
    setEarnings(mockData[selectedPeriod]);
  }, [selectedPeriod]);

  const calculateTotal = () => {
    return earnings.reduce((sum, item) => sum + item.value, 0);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Meus Ganhos</Text>
        <Text style={[styles.headerAmount, { color: colors.text }]}>
          R$ {calculateTotal().toFixed(2)}
        </Text>
        <Text style={[styles.headerPeriod, { color: colors.text }]}>
          {selectedPeriod === 'week' ? 'Esta semana' : 'Este mês'}
        </Text>
      </View>

      <View style={[styles.chartContainer, { backgroundColor: colors.card }]}>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={earnings}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis
              dataKey="name"
              stroke={colors.text}
              tick={{ fill: colors.text }}
            />
            <YAxis
              stroke={colors.text}
              tick={{ fill: colors.text }}
              tickFormatter={(value) => `R$ ${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
              itemStyle={{ color: colors.text }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={colors.primary}
              strokeWidth={2}
              dot={{ fill: colors.primary }}
            />
          </LineChart>
        </ResponsiveContainer>
      </View>

      <View style={styles.periodSelector}>
        <TouchableOpacity
          style={[
            styles.periodOption,
            selectedPeriod === 'week' && [styles.periodOptionActive, { backgroundColor: colors.primary }]
          ]}
          onPress={() => setSelectedPeriod('week')}
        >
          <Text style={selectedPeriod === 'week' ? styles.periodOptionActiveText : styles.periodOptionText}>
            Semanal
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.periodOption,
            selectedPeriod === 'month' && [styles.periodOptionActive, { backgroundColor: colors.primary }]
          ]}
          onPress={() => setSelectedPeriod('month')}
        >
          <Text style={selectedPeriod === 'month' ? styles.periodOptionActiveText : styles.periodOptionText}>
            Mensal
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.deliveriesList, { backgroundColor: colors.card }]}>
        <Text style={[styles.listTitle, { color: colors.text }]}>Entregas realizadas</Text>
        {earnings.map((item, index) => (
          <View key={index} style={styles.deliveryItem}>
            <Text style={[styles.deliveryDay, { color: colors.text }]}>{item.name}</Text>
            <Text style={[styles.deliveryAmount, { color: colors.text }]}>
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
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  headerPeriod: {
    fontSize: 16,
  },
  chartContainer: {
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
  },
  periodOptionActive: {
    backgroundColor: '#FF9900',
  },
  periodOptionText: {
    color: '#555',
  },
  periodOptionActiveText: {
    color: 'white',
  },
  deliveriesList: {
    margin: 15,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
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